import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailFolder } from "../../common/enums/email-folder.enum";
import { EmailPriority } from "../../common/enums/email-priority.enum";
import { Email } from "../emails/entities/email.entity";

type AnalysisResponse = {
  priority?: string;
  severity?: string;
  deadline?: string | null;
  task?: string | null;
  summary?: string | null;
  shouldCreateTask?: boolean;
};

type ClassificationResponse = {
  need_attention?: boolean;
  deadline_next_7_days?: boolean;
  waiting_for_response?: boolean;
  auto_response?: boolean;
  context?: string | null;
  deadline?: string | null;
  action_needed?: string | null;
  urgency?: string | null;
};

@Injectable()
export class EmailAnalysisService {
  private readonly logger = new Logger(EmailAnalysisService.name);
  private readonly endpoint = "http://10.27.87.72:8000/analyze";
  private readonly classificationEndpoint = "https://api.sarvam.ai/v1/chat/completions";
  private readonly batchSize = 10;

  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  async analyzeEmail(emailId: string) {
    const email = await this.emailRepository.findOne({ where: { id: emailId } });

    if (!email) {
      throw new NotFoundException("Email not found");
    }

    return this.analyzeAndClassifyEmail(email);
  }

  async analyzeAllEmails() {
    let analyzed = 0;
    let skipped = 0;
    let failed = 0;

    const emails = await this.emailRepository.find({ order: { createdAt: "DESC" } });

    for (let index = 0; index < emails.length; index += this.batchSize) {
      const batch = emails.slice(index, index + this.batchSize);

      for (const email of batch) {
        if (this.hasAnalysis(email)) {
          skipped += 1;
          continue;
        }

        try {
          await this.analyzeAndClassifyEmail(email);
          analyzed += 1;
        } catch (error) {
          failed += 1;
          this.logger.error(`Failed to analyze email ${email.id}`, error);
        }
      }
    }

    return { analyzed, skipped, failed };
  }

  async getDashboard() {
    const inboxEmails = await this.emailRepository.find({
      where: { folder: EmailFolder.INBOX },
      order: { createdAt: "DESC" },
    });

    const emails = await this.analyzeMissingEmails(inboxEmails);
    const toDashboardItem = (email: Email) => ({
      id: email.id,
      sender: email.sender,
      subject: email.subject,
      summary: email.summary,
      deadline: email.deadline,
      extractedTask: email.extractedTask,
      shouldCreateTask: email.shouldCreateTask,
      priority: email.priority,
      severity: email.severity,
      category: email.category,
      createdAt: email.createdAt,
      needsAttention: email.needsAttention,
      deadlineNext7Days: email.deadlineNext7Days,
      waitingForResponse: email.waitingForResponse,
      autoResponse: email.autoResponse,
    });

    const needsAttentionEmails = emails.filter((email) => email.needsAttention);
    const deadlineEmails = emails.filter((email) => email.deadlineNext7Days);
    const waitingForResponseEmails = emails.filter((email) => email.waitingForResponse);
    const autoResponseEmails = emails.filter((email) => email.autoResponse);

    const importantForYou = needsAttentionEmails
      .slice(0, 20)
      .map(toDashboardItem);

    return {
      needsAttentionCount: needsAttentionEmails.length,
      deadlinesCount: deadlineEmails.length,
      waitingForRepliesCount: waitingForResponseEmails.length,
      autoResolvedCount: autoResponseEmails.length,
      importantForYou,
      needsAttention: importantForYou,
      deadlines: deadlineEmails.slice(0, 20).map(toDashboardItem),
      waitingForReplies: waitingForResponseEmails.slice(0, 20).map(toDashboardItem),
      autoResolved: autoResponseEmails.slice(0, 20).map(toDashboardItem),
    };
  }

  private hasAnalysis(email: Email) {
    return Boolean(
      email.summary ||
        email.severity ||
        email.deadline ||
        email.extractedTask ||
        email.shouldCreateTask !== null,
    );
  }

  private async analyzeMissingEmails(emails: Email[]) {
    const analyzedEmails: Email[] = [];

    for (let index = 0; index < emails.length; index += this.batchSize) {
      const batch = emails.slice(index, index + this.batchSize);

      for (const email of batch) {
        if (this.hasAnalysis(email)) {
          analyzedEmails.push(email);
          continue;
        }

        try {
          analyzedEmails.push(await this.analyzeAndClassifyEmail(email));
        } catch (error) {
          this.logger.error(`Failed to analyze email ${email.id}`, error);
          analyzedEmails.push(email);
        }
      }
    }

    return analyzedEmails;
  }

  private async callAnalysisApi(email: Email) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      this.logger.log(
        `Sending email ${email.id} to AI model: ${JSON.stringify({
          subject: email.subject,
          text: email.content,
        })}`,
      );

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: email.subject,
          text: email.content,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`AI API failed with status ${response.status}`);
      }

      const analysis = (await response.json()) as AnalysisResponse;
      this.logger.log(`AI model response for email ${email.id}: ${JSON.stringify(analysis)}`);

      if (!this.hasUsefulAnalysis(analysis)) {
        this.logger.warn(
          `AI model returned no usable analysis for email ${email.id}. Response: ${JSON.stringify(analysis)}`,
        );
      }

      return analysis;
    } finally {
      clearTimeout(timeout);
    }
  }

  private async callClassificationApi(email: Email) {
    const apiKey = process.env.SARVAM_API_KEY;

    if (!apiKey) {
      this.logger.warn("SARVAM_API_KEY is missing. Skipping email classification model.");
      return null;
    }

    const prompt = `Return ONLY one compact valid JSON object. No markdown. No explanation. No code fences.

Classify this email:
${email.content}

Use this exact JSON schema:
{
  "need_attention": true,
  "deadline_next_7_days": false,
  "waiting_for_response": false,
  "auto_response": false,
  "context": "one short sentence",
  "deadline": null,
  "action_needed": "short action",
  "urgency": "high"
}`;

    const response = await fetch(this.classificationEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sarvam-30b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`Classification API failed with status ${response.status}`);
    }

    const result = await response.json();
    const message = result?.choices?.[0]?.message;
    const text = message?.content || message?.reasoning_content || "";
    const classification = this.extractClassificationJson(String(text));

    if (!classification) {
      this.logger.warn(`Classification model returned no JSON for email ${email.id}: ${text}`);
      return null;
    }

    this.logger.log(`Classification model response for email ${email.id}: ${JSON.stringify(classification)}`);
    return classification;
  }

  private extractClassificationJson(text: string) {
    const jsonCandidates = text.match(/\{[^{}]*\}/g) ?? [];

    for (const candidate of jsonCandidates.reverse()) {
      try {
        const parsed = JSON.parse(candidate) as ClassificationResponse;
        const hasExpectedShape =
          "need_attention" in parsed ||
          "deadline_next_7_days" in parsed ||
          "waiting_for_response" in parsed ||
          "auto_response" in parsed;

        if (hasExpectedShape) {
          return parsed;
        }
      } catch {
        continue;
      }
    }

    return null;
  }

  private async analyzeAndClassifyEmail(email: Email) {
    let updatedEmail = email;

    if (!this.hasAnalysis(email)) {
      const analysis = await this.callAnalysisApi(email);
      updatedEmail = await this.applyAnalysis(updatedEmail, analysis);
    }

    if (!this.hasClassification(updatedEmail)) {
      const classification = await this.callClassificationApi(updatedEmail);
      if (classification) {
        updatedEmail = await this.applyClassification(updatedEmail, classification);
      }
    }

    return updatedEmail;
  }

  private hasClassification(email: Email) {
    return Boolean(
      email.needsAttention !== null ||
        email.deadlineNext7Days !== null ||
        email.waitingForResponse !== null ||
        email.autoResponse !== null,
    );
  }

  private hasUsefulAnalysis(analysis: AnalysisResponse) {
    return Boolean(
      analysis.summary ||
        analysis.priority ||
        analysis.severity ||
        analysis.deadline ||
        analysis.task ||
        analysis.shouldCreateTask !== undefined,
    );
  }

  private async applyAnalysis(email: Email, analysis: AnalysisResponse) {
    email.summary = analysis.summary ?? email.summary;
    email.priority = this.normalizePriority(analysis.priority) ?? email.priority;
    email.severity = analysis.severity ?? email.severity;
    email.deadline = analysis.deadline ? this.parseDeadline(analysis.deadline) : email.deadline;
    email.extractedTask = analysis.task ?? email.extractedTask;
    email.shouldCreateTask = analysis.shouldCreateTask ?? email.shouldCreateTask;

    return this.emailRepository.save(email);
  }

  private async applyClassification(email: Email, classification: ClassificationResponse) {
    email.needsAttention = classification.need_attention ?? email.needsAttention;
    email.deadlineNext7Days = classification.deadline_next_7_days ?? email.deadlineNext7Days;
    email.waitingForResponse = classification.waiting_for_response ?? email.waitingForResponse;
    email.autoResponse = classification.auto_response ?? email.autoResponse;
    email.summary = classification.context ?? email.summary;
    email.extractedTask = classification.action_needed ?? email.extractedTask;
    email.severity = classification.urgency ?? email.severity;
    email.deadline = classification.deadline
      ? this.parseDeadline(classification.deadline)
      : email.deadline;

    return this.emailRepository.save(email);
  }

  private normalizePriority(priority?: string) {
    const normalized = priority?.toLowerCase();

    if (normalized === "high") {
      return EmailPriority.HIGH;
    }

    if (normalized === "medium") {
      return EmailPriority.MEDIUM;
    }

    if (normalized === "low") {
      return EmailPriority.LOW;
    }

    return undefined;
  }

  private parseDeadline(deadline: string) {
    const trimmedDeadline = deadline.trim();
    const isoDate = new Date(trimmedDeadline);

    if (!Number.isNaN(isoDate.getTime())) {
      return isoDate;
    }

    const dateMatch = trimmedDeadline.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!dateMatch) {
      return null;
    }

    const [, day, month, year] = dateMatch;
    const timeMatch = trimmedDeadline.match(/(\d{1,2})(?::(\d{2}))\s*(AM|PM)?/i);
    let hours = timeMatch ? Number(timeMatch[1]) : 23;
    const minutes = timeMatch?.[2] ? Number(timeMatch[2]) : 59;
    const meridiem = timeMatch?.[3]?.toUpperCase();

    if (meridiem === "PM" && hours < 12) {
      hours += 12;
    }

    if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }

    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day), hours, minutes);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }
}
