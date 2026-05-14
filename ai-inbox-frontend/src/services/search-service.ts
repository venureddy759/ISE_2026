import type { Email } from "@/types/email";
import { api } from "./api";
import { normalizeEmail } from "./email-service";

export interface SemanticSearchResponse {
  query: string;
  matches: Email[];
  context?: {
    terms: string[];
    dateRange: {
      label: string;
      start: string;
      end: string;
    } | null;
  };
}

export const searchService = {
  async semanticSearch(query: string) {
    const { data } = await api.post<SemanticSearchResponse>("/search/semantic", {
      query,
    });
    return {
      ...data,
      matches: data.matches.map(normalizeEmail),
    };
  },
};
