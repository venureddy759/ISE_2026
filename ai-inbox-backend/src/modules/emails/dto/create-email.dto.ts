import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { EmailCategory } from "../../../common/enums/email-category.enum";
import { EmailFolder } from "../../../common/enums/email-folder.enum";
import { EmailPriority } from "../../../common/enums/email-priority.enum";

export class CreateEmailDto {
  @IsUUID()
  userId!: string;

  @IsOptional()
  @IsEnum(EmailFolder)
  folder?: EmailFolder;

  @IsString()
  sender!: string;

  @IsString()
  recipient!: string;

  @IsString()
  subject!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  translatedContent?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsEnum(EmailCategory)
  category!: EmailCategory;

  @IsEnum(EmailPriority)
  priority!: EmailPriority;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
