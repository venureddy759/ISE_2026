import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { EmailAnalysisService } from "./email-analysis.service";
import { SummarizationService } from "./summarization.service";
import { TranslationService } from "./translation.service";

type AuthenticatedRequest = {
  user: {
    userId: string;
    email: string;
  };
};

@Controller("ai")
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(
    private readonly emailAnalysisService: EmailAnalysisService,
    private readonly summarizationService: SummarizationService,
    private readonly translationService: TranslationService,
  ) {}

  @Post("analyze/:emailId")
  analyzeEmail(@Param("emailId") emailId: string, @Req() request: AuthenticatedRequest) {
    return this.emailAnalysisService.analyzeEmail(emailId, request.user.userId);
  }

  @Post("summarize/:emailId")
  summarizeEmail(@Param("emailId") emailId: string, @Req() request: AuthenticatedRequest) {
    return this.summarizationService.summarizeEmail(emailId, request.user.userId);
  }

  @Post("translate/:emailId")
  translateEmail(@Param("emailId") emailId: string, @Req() request: AuthenticatedRequest) {
    return this.translationService.translateEmail(emailId, request.user.userId);
  }

  @Post("analyze-all")
  analyzeAllEmails(@Req() request: AuthenticatedRequest) {
    return this.emailAnalysisService.analyzeAllEmails(request.user.userId);
  }

  @Get("dashboard")
  getDashboard(@Req() request: AuthenticatedRequest) {
    return this.emailAnalysisService.getDashboard(request.user.userId);
  }
}
