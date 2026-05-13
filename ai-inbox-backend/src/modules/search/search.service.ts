import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSearchHistoryDto } from "./dto/create-search-history.dto";
import { SearchHistory } from "./entities/search-history.entity";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchHistory)
    private readonly searchHistoryRepository: Repository<SearchHistory>,
  ) {}

  create(createSearchHistoryDto: CreateSearchHistoryDto) {
    const searchHistory =
      this.searchHistoryRepository.create(createSearchHistoryDto);
    return this.searchHistoryRepository.save(searchHistory);
  }

  findByUser(userId: string) {
    return this.searchHistoryRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async remove(id: string) {
    const history = await this.searchHistoryRepository.findOne({
      where: { id },
    });

    if (history) {
      await this.searchHistoryRepository.remove(history);
    }

    return { message: "Search history deleted successfully" };
  }
}
