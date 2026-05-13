import type { Email } from "@/types/email";
import { api } from "./api";

export interface SemanticSearchResponse {
  query: string;
  matches: Email[];
}

export const searchService = {
  async semanticSearch(query: string) {
    const { data } = await api.post<SemanticSearchResponse>("/search/semantic", {
      query,
    });
    return data;
  },
};
