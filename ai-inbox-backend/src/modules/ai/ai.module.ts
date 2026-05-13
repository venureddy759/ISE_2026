import { Module } from "@nestjs/common";
import { CategorizationService } from "./categorization.service";
import { ReplyService } from "./reply.service";
import { SummarizationService } from "./summarization.service";
import { TranslationService } from "./translation.service";

@Module({
  providers: [
    SummarizationService,
    TranslationService,
    CategorizationService,
    ReplyService,
  ],
  exports: [
    SummarizationService,
    TranslationService,
    CategorizationService,
    ReplyService,
  ],
})
export class AiModule {}
