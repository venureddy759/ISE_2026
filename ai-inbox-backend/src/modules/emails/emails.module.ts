import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AiModule } from "src/modules/ai/ai.module";
import { Email } from "./entities/email.entity";
import { EmailReply } from "./entities/email-reply.entity";
import { EmailsController } from "./emails.controller";
import { EmailsService } from "./emails.service";

@Module({
  imports: [TypeOrmModule.forFeature([Email, EmailReply]), AiModule],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
