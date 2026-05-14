export type EmailCategory =
  | "Work"
  | "Personal"
  | "Finance"
  | "College"
  | "Urgent"
  | "Meetings";

export type EmailPriority = "High" | "Medium" | "Low";

export type EmailFolder = "inbox" | "sent" | "draft" | "bin";

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
  severity?: string | null;
  deadline?: string | null;
  extractedTask?: string | null;
  shouldCreateTask?: boolean | null;
  needsAttention?: boolean | null;
  deadlineNext7Days?: boolean | null;
  waitingForResponse?: boolean | null;
  autoResponse?: boolean | null;
  createdAt: string;
  isRead: boolean;
  isStarred: boolean;
  summary?: EmailSummary | string | null;
  tasks?: EmailTask[] | null;
  readReceipt?: EmailReadReceipt | null;
}
