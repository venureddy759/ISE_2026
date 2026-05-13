import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { EmailCategory } from "src/common/enums/email-category.enum";
import { EmailPriority } from "src/common/enums/email-priority.enum";

export class CreateEmailDto {
  @IsUUID()
  userId!: string;

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
