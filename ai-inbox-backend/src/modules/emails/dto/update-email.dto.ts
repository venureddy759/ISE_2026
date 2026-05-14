import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { EmailCategory } from "../../../common/enums/email-category.enum";
import { EmailFolder } from "../../../common/enums/email-folder.enum";
import { EmailPriority } from "../../../common/enums/email-priority.enum";

export class UpdateEmailDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  sender?: string;

  @IsOptional()
  @IsEnum(EmailFolder)
  folder?: EmailFolder;

  @IsOptional()
  @IsString()
  recipient?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  translatedContent?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsEnum(EmailCategory)
  category?: EmailCategory;

  @IsOptional()
  @IsEnum(EmailPriority)
  priority?: EmailPriority;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsBoolean()
  isStarred?: boolean;
}
