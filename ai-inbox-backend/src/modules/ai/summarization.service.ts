import { Injectable } from "@nestjs/common";

@Injectable()
export class SummarizationService {
  summarize(content: string) {
    return {
      shortSummary: `Mock summary: ${content.slice(0, 80)}...`,
      keyPoints: [
        "Placeholder key point one",
        "Placeholder key point two",
        "Placeholder key point three",
      ],
      actionItems: ["Placeholder action item"],
    };
  }
}
