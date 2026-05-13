import { Injectable } from "@nestjs/common";

@Injectable()
export class TranslationService {
  translate(content: string, targetLanguage = "en") {
    return {
      language: targetLanguage,
      translatedText: `Mock translated (${targetLanguage}): ${content}`,
    };
  }
}
