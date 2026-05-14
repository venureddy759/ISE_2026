import { IsEnum, IsOptional, IsString } from "class-validator";
import { EmailCategory } from "../../../common/enums/email-category.enum";
import { EmailFolder } from "../../../common/enums/email-folder.enum";

export class FilterEmailsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(EmailCategory)
  category?: EmailCategory;

  @IsOptional()
  @IsEnum(EmailFolder)
  folder?: EmailFolder;
}
