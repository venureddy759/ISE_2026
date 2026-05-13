import { IsString, IsUUID } from "class-validator";

export class CreateSearchHistoryDto {
  @IsUUID()
  userId!: string;

  @IsString()
  query!: string;
}
