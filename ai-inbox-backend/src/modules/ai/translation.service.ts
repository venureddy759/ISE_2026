import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Email } from "../emails/entities/email.entity";

@Injectable()
export class TranslationService {
  private readonly sarvamUrl = "https://api.sarvam.ai/translate";

  constructor(
    @InjectRepository(Email)
    private readonly emailsRepository: Repository<Email>,
    private readonly configService: ConfigService,
  ) {}

  async translateEmail(emailId: string) {
    const email = await this.emailsRepository.findOne({
      where: { id: emailId },
      relations: ["user"],
    });

    if (!email) {
      throw new NotFoundException("Email not found");
    }

    const targetLanguage = email.user?.preferredLanguage || "en-IN";
    const sourceLanguage = this.normalizeLanguageCode(email.language);

    if (sourceLanguage === targetLanguage) {
      email.translatedContent = email.translatedContent || email.content;
      return this.emailsRepository.save(email);
    }

    const translatedText = await this.translateText(
      email.content,
      sourceLanguage,
      targetLanguage,
    );

    email.translatedContent = translatedText;
    return this.emailsRepository.save(email);
  }

  private async translateText(
    input: string,
    sourceLanguage: string,
    targetLanguage: string,
  ) {
    const apiKey =
      this.configService.get<string>("SARVAM_API_KEY") ||
      "sk_410cln23_ABmVKGuDgLfazIr21nUPifAM";

    const response = await fetch(this.sarvamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify({
        input,
        source_language_code: sourceLanguage,
        target_language_code: targetLanguage,
        speaker_gender: "Male",
        mode: "formal",
        model: "mayura:v1",
        enable_preprocessing: true,
      }),
    });

    const data = (await response.json().catch(() => null)) as
      | {
          translated_text?: string;
          translatedText?: string;
          output?: string;
          error?: unknown;
          message?: unknown;
        }
      | null;

    if (!response.ok) {
      throw new BadGatewayException({
        message: "Sarvam translation failed",
        statusCode: response.status,
        details: data?.error ?? data?.message ?? data,
      });
    }

    const translatedText =
      data?.translated_text ?? data?.translatedText ?? data?.output;

    if (!translatedText) {
      throw new BadGatewayException("Sarvam translation response was empty");
    }

    return translatedText;
  }

  private normalizeLanguageCode(language?: string | null) {
    if (!language || language === "en") {
      return "en-IN";
    }

    return language.includes("-") ? language : `${language}-IN`;
  }
}
