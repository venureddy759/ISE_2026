import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateSearchHistoryDto } from "./dto/create-search-history.dto";
import { SearchService } from "./search.service";

type SemanticSearchDto = {
  query: string;
};

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("history")
  create(@Body() createSearchHistoryDto: CreateSearchHistoryDto) {
    return this.searchService.create(createSearchHistoryDto);
  }

  @Post("semantic")
  semanticSearch(@Body() semanticSearchDto: SemanticSearchDto) {
    return this.searchService.semanticSearch(semanticSearchDto.query);
  }

  @Get("history/:userId")
  findByUser(@Param("userId") userId: string) {
    return this.searchService.findByUser(userId);
  }

  @Delete("history/:id")
  remove(@Param("id") id: string) {
    return this.searchService.remove(id);
  }
}
