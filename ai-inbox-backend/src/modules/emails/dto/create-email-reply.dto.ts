import { IsString } from "class-validator";

export class CreateEmailReplyDto {
  @IsString()
  replyType!: string;

  @IsString()
  content!: string;
}
