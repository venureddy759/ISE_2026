export type EmailCategory =
  | "Work"
  | "Personal"
  | "Finance"
  | "College"
  | "Urgent"
  | "Meetings";

export type EmailPriority = "High" | "Medium" | "Low";

export type EmailFolder = "inbox" | "sent";

export type ReplySuggestionType = "professional" | "friendly" | "short";

export interface ReplySuggestion {
  id: string;
  type: ReplySuggestionType;
  content: string;
}

export interface EmailSummary {
  shortSummary: string;
  keyPoints: string[];
  actionItems: string[];
}

export interface EmailTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface EmailReadReceipt {
  status: "sent" | "delivered" | "read";
  seenAt?: string;
}

export interface Email {
  id: string;
  folder?: EmailFolder | null;
  sender: string;
  senderEmail?: string | null;
  recipient: string;
  subject: string;
  preview: string;
  content: string;
  translatedContent?: string | null;
  category: EmailCategory;
  priority: EmailPriority;
  createdAt: string;
  isRead: boolean;
  summary?: EmailSummary | string | null;
  replySuggestions?: ReplySuggestion[] | null;
  tasks?: EmailTask[] | null;
  readReceipt?: EmailReadReceipt | null;
}
