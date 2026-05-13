import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSearchHistoryDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  query?: string;
}
