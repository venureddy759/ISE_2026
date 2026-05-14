import { Controller, Get, Param, Post } from "@nestjs/common";
import { EmailAnalysisService } from "./email-analysis.service";

@Controller("ai")
export class AiController {
  constructor(private readonly emailAnalysisService: EmailAnalysisService) {}

  @Post("analyze/:emailId")
  analyzeEmail(@Param("emailId") emailId: string) {
    return this.emailAnalysisService.analyzeEmail(emailId);
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
