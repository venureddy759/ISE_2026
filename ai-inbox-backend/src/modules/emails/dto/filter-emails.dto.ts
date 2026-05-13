import { IsEnum, IsOptional, IsString } from "class-validator";
import { EmailCategory } from "src/common/enums/email-category.enum";

export class FilterEmailsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(EmailCategory)
  category?: EmailCategory;
}
