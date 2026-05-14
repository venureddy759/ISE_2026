import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailFolder } from "../../common/enums/email-folder.enum";
import { Email } from "../emails/entities/email.entity";
import { CreateSearchHistoryDto } from "./dto/create-search-history.dto";
import { SearchHistory } from "./entities/search-history.entity";

type DateRange = {
  label: string;
  start: Date;
  end: Date;
};

const fillerWords = new Set([
  "a",
  "about",
  "all",
  "an",
  "and",
  "any",
  "between",
  "email",
  "emails",
  "find",
  "for",
  "from",
  "get",
  "in",
  "mail",
  "mails",
  "me",
  "message",
  "messages",
  "of",
  "on",
  "related",
  "retrieve",
  "search",
  "show",
  "that",
  "the",
  "this",
  "to",
  "with",
  "within",
]);

function startOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function getDateRange(query: string, now = new Date()): DateRange | null {
  const normalized = query.toLowerCase();
  const today = startOfDay(now);
  const tomorrow = addDays(today, 1);
  const day = today.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const startOfThisWeek = addDays(today, mondayOffset);

  if (/\b(today)\b/.test(normalized)) {
    return { label: "today", start: today, end: tomorrow };
  }

  if (/\b(yesterday)\b/.test(normalized)) {
    return { label: "yesterday", start: addDays(today, -1), end: today };
  }

  if (/\b(last week|previous week)\b/.test(normalized)) {
    return {
      label: "last week",
      start: addDays(startOfThisWeek, -7),
      end: startOfThisWeek,
    };
  }

  if (/\b(this week|current week|within this week)\b/.test(normalized)) {
    return {
      label: "this week",
      start: startOfThisWeek,
      end: addDays(startOfThisWeek, 7),
    };
  }

  const daysMatch = normalized.match(/\b(?:within|last|past)\s+(\d{1,3})\s+days?\b/);
  if (daysMatch) {
    const days = Number(daysMatch[1]);
    return {
      label: `last ${days} days`,
      start: addDays(today, -days),
      end: tomorrow,
    };
  }

  return null;
}

function extractSearchTerms(query: string) {
  const withoutDateContext = query
    .toLowerCase()
    .replace(/\b(within\s+this\s+week|this\s+week|current\s+week|last\s+week|previous\s+week|today|yesterday)\b/g, " ")
    .replace(/\b(?:within|last|past)\s+\d{1,3}\s+days?\b/g, " ");

  return withoutDateContext
    .split(/[^a-z0-9@._-]+/i)
    .map((term) => term.trim())
    .filter((term) => term.length >= 2 && !fillerWords.has(term));
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchHistory)
    private readonly searchHistoryRepository: Repository<SearchHistory>,
    @InjectRepository(Email)
    private readonly emailsRepository: Repository<Email>,
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

  async semanticSearch(query: string) {
    const cleanQuery = query?.trim() ?? "";
    if (!cleanQuery) {
      return { query: cleanQuery, matches: [], context: { terms: [], dateRange: null } };
    }

    const dateRange = getDateRange(cleanQuery);
    const terms = extractSearchTerms(cleanQuery);
    const queryBuilder = this.emailsRepository
      .createQueryBuilder("email")
      .where("email.folder != :binFolder", { binFolder: EmailFolder.BIN })
      .orderBy("email.createdAt", "DESC")
      .take(50);

    if (dateRange) {
      queryBuilder.andWhere("email.createdAt >= :startDate AND email.createdAt < :endDate", {
        startDate: dateRange.start,
        endDate: dateRange.end,
      });
    }

    terms.forEach((term, index) => {
      queryBuilder.andWhere(
        `(LOWER(email.sender) LIKE :term${index}
          OR LOWER(email.recipient) LIKE :term${index}
          OR LOWER(email.subject) LIKE :term${index}
          OR LOWER(email.content) LIKE :term${index}
          OR LOWER(CAST(email.category AS TEXT)) LIKE :term${index}
          OR LOWER(CAST(email.priority AS TEXT)) LIKE :term${index})`,
        { [`term${index}`]: `%${term.toLowerCase()}%` },
      );
    });

    return {
      query: cleanQuery,
      matches: await queryBuilder.getMany(),
      context: {
        terms,
        dateRange: dateRange
          ? {
              label: dateRange.label,
              start: dateRange.start.toISOString(),
              end: dateRange.end.toISOString(),
            }
          : null,
      },
    };
  }
}
