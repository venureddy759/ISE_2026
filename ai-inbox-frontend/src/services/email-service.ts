import type { Email, EmailCategory, EmailFolder, EmailPriority, EmailSummary } from "@/types/email";
import { api } from "./api";

const defaultSummary: EmailSummary = {
  shortSummary: "No AI summary is available for this email yet.",
  keyPoints: [],
  actionItems: [],
};

const validCategories: EmailCategory[] = [
  "Work",
  "Personal",
  "Finance",
  "College",
  "Urgent",
  "Meetings",
];

const validPriorities: EmailPriority[] = ["High", "Medium", "Low"];
const validFolders: EmailFolder[] = ["inbox", "sent"];

function textOrFallback(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function normalizeSummary(summary: Email["summary"]): EmailSummary {
  if (typeof summary === "string") {
    return { ...defaultSummary, shortSummary: textOrFallback(summary, defaultSummary.shortSummary) };
  }

  if (!summary) {
    return defaultSummary;
  }

  return {
    shortSummary: textOrFallback(summary.shortSummary, defaultSummary.shortSummary),
    keyPoints: Array.isArray(summary.keyPoints) ? summary.keyPoints.filter(Boolean) : [],
    actionItems: Array.isArray(summary.actionItems) ? summary.actionItems.filter(Boolean) : [],
  };
}

export function normalizeEmail(email: Partial<Email>): Email {
  const subject = textOrFallback(email.subject, "(No subject)");
  const content = textOrFallback(email.content, "No message content available.");
  const category = validCategories.includes(email.category as EmailCategory)
    ? (email.category as EmailCategory)
    : "Personal";
  const priority = validPriorities.includes(email.priority as EmailPriority)
    ? (email.priority as EmailPriority)
    : "Low";

  return {
    id: textOrFallback(email.id, crypto.randomUUID()),
    folder: validFolders.includes(email.folder as EmailFolder)
      ? (email.folder as EmailFolder)
      : "inbox",
    sender: textOrFallback(email.sender, "Unknown sender"),
    senderEmail: textOrFallback(email.senderEmail, ""),
    recipient: textOrFallback(email.recipient, ""),
    subject,
    preview: textOrFallback(email.preview, content.slice(0, 140)),
    content,
    translatedContent: textOrFallback(email.translatedContent, content),
    category,
    priority,
    createdAt: textOrFallback(email.createdAt, new Date().toISOString()),
    isRead: Boolean(email.isRead),
    summary: normalizeSummary(email.summary),
    replySuggestions: Array.isArray(email.replySuggestions) ? email.replySuggestions : [],
    tasks: Array.isArray(email.tasks) ? email.tasks : [],
    readReceipt: email.readReceipt ?? { status: "sent" },
  };
}

export const emailService = {
  async list(params?: { category?: string; search?: string; folder?: EmailFolder }) {
    const { data } = await api.get<Email[] | { data: Email[] }>("/emails", { params });
    const emails = Array.isArray(data) ? data : data.data ?? [];
    return emails.map(normalizeEmail);
  },
  async getById(emailId: string) {
    const { data } = await api.get<Email>(`/emails/${emailId}`);
    return normalizeEmail(data);
  },
};
