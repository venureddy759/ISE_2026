import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Email } from "../emails/entities/email.entity";
import { SearchHistory } from "./entities/search-history.entity";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory, Email])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
