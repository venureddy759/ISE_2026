import { Controller, Get, Param, Post } from "@nestjs/common";
import { EmailAnalysisService } from "./email-analysis.service";
import { SummarizationService } from "./summarization.service";

@Controller("ai")
export class AiController {
  constructor(
    private readonly emailAnalysisService: EmailAnalysisService,
    private readonly summarizationService: SummarizationService,
  ) {}

  @Post("analyze/:emailId")
  analyzeEmail(@Param("emailId") emailId: string) {
    return this.emailAnalysisService.analyzeEmail(emailId);
  }

  @Post("summarize/:emailId")
  summarizeEmail(@Param("emailId") emailId: string) {
    return this.summarizationService.summarizeEmail(emailId);
  }

  @Post("analyze-all")
  analyzeAllEmails() {
    return this.emailAnalysisService.analyzeAllEmails();
  }

  @Get("dashboard")
  getDashboard() {
    return this.emailAnalysisService.getDashboard();
  }
}
