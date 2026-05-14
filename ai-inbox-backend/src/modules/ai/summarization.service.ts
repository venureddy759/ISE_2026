import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Email } from "../emails/entities/email.entity";

@Injectable()
export class SummarizationService {
  private readonly logger = new Logger(SummarizationService.name);
  private readonly endpoint = "https://api.sarvam.ai/v1/chat/completions";

  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  async summarizeEmail(emailId: string, userId?: string) {
    const email = await this.emailRepository.findOne({
      where: userId ? { id: emailId, userId } : { id: emailId },
    });

    if (!email) {
      throw new NotFoundException("Email not found");
    }

    const summary = await this.summarize(email.content);
    email.summary = summary;

    return this.emailRepository.save(email);
  }

  async summarize(content: string) {
    const apiKey = process.env.SARVAM_API_KEY;

    if (!apiKey) {
      this.logger.warn("SARVAM_API_KEY is missing. Skipping Sarvam summarization.");
      return this.fallbackSummary(content);
    }

    const prompt = `
Return ONLY the final summary.
Do not explain.
Do not think step-by-step.
Do not output <think> tags.

Email:
${content}

Write final answer only after </think>.
Summary must be exactly 4 lines.
`;

    this.logger.log("Sending email content to Sarvam summarizer.");

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sarvam-m",
        messages: [
          {
            role: "system",
            content: "You are a professional email summarizer. Never show reasoning.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0,
        max_tokens: 1000,
      }),
    });

    const result = await response.json();
    console.log("[AI SUMMARY FULL RESPONSE]", result);

    if (!response.ok) {
      throw new Error(`Sarvam summarization failed with status ${response.status}`);
    }

    const message = result?.choices?.[0]?.message;
    const rawSummary = String(message?.content || message?.reasoning_content || "");
    const summary = rawSummary.replace(/<think>.*?<\/think>/gs, "").trim();

    console.log("[AI SUMMARY OUTPUT]", summary);

    return summary || this.fallbackSummary(content);
  }

  private fallbackSummary(content: string) {
    return content
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 60)
      .join(" ");
  }
}
