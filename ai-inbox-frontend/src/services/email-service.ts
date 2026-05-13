import type { Email } from "@/types/email";
import { api } from "./api";

export const emailService = {
  async list(params?: { category?: string; search?: string }) {
    const { data } = await api.get<Email[] | { data: Email[] }>("/emails", { params });
    return Array.isArray(data) ? data : data.data ?? [];
  },
  async getById(emailId: string) {
    const { data } = await api.get<Email>(`/emails/${emailId}`);
    return data;
  },
};
