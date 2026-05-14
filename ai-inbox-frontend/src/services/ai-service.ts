import type { EmailCategory, EmailPriority } from "@/types/email";
import type { Email } from "@/types/email";
import { normalizeEmail } from "./email-service";
import { api } from "./api";

export type AiDashboardEmail = {
  id: string;
  sender: string;
  subject?: string | null;
  summary?: string | null;
  deadline?: string | null;
  extractedTask?: string | null;
  shouldCreateTask?: boolean | null;
  priority?: EmailPriority | null;
  severity?: string | null;
  category?: EmailCategory | null;
  createdAt?: string | null;
  needsAttention?: boolean | null;
  deadlineNext7Days?: boolean | null;
  waitingForResponse?: boolean | null;
  autoResponse?: boolean | null;
};

export type AiDashboard = {
  needsAttentionCount: number;
  deadlinesCount: number;
  waitingForRepliesCount: number;
  autoResolvedCount: number;
  importantForYou: AiDashboardEmail[];
  needsAttention: AiDashboardEmail[];
  deadlines: AiDashboardEmail[];
  waitingForReplies: AiDashboardEmail[];
  autoResolved: AiDashboardEmail[];
};

export const aiService = {
  async getDashboard() {
    const { data } = await api.get<AiDashboard>("/ai/dashboard");
    return {
      needsAttentionCount: data.needsAttentionCount ?? 0,
      deadlinesCount: data.deadlinesCount ?? 0,
      waitingForRepliesCount: data.waitingForRepliesCount ?? 0,
      autoResolvedCount: data.autoResolvedCount ?? 0,
      importantForYou: Array.isArray(data.importantForYou) ? data.importantForYou : [],
      needsAttention: Array.isArray(data.needsAttention) ? data.needsAttention : [],
      deadlines: Array.isArray(data.deadlines) ? data.deadlines : [],
      waitingForReplies: Array.isArray(data.waitingForReplies) ? data.waitingForReplies : [],
      autoResolved: Array.isArray(data.autoResolved) ? data.autoResolved : [],
    };
  },
  async analyzeEmail(emailId: string) {
    const { data } = await api.post(`/ai/analyze/${emailId}`);
    return data;
  },
  async summarizeEmail(emailId: string) {
    const { data } = await api.post<Email>(`/ai/summarize/${emailId}`);
    return normalizeEmail(data);
  },
  async translateEmail(emailId: string) {
    const { data } = await api.post<Email>(`/ai/translate/${emailId}`);
    return normalizeEmail(data);
  },
  async analyzeAll() {
    const { data } = await api.post("/ai/analyze-all");
    return data;
  },
};
