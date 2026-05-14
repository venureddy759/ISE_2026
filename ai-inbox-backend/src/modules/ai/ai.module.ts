import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Email } from "../emails/entities/email.entity";
import { AiController } from "./ai.controller";
import { CategorizationService } from "./categorization.service";
import { EmailAnalysisService } from "./email-analysis.service";
import { ReplyService } from "./reply.service";
import { SummarizationService } from "./summarization.service";
import { TranslationService } from "./translation.service";

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  controllers: [AiController],
  providers: [
    EmailAnalysisService,
    SummarizationService,
    TranslationService,
    CategorizationService,
    ReplyService,
  ],
  exports: [
    EmailAnalysisService,
    SummarizationService,
    TranslationService,
    CategorizationService,
    ReplyService,
  ],
})
export class AiModule {}
