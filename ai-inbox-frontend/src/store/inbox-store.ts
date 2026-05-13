import { create } from "zustand";
import { mockEmails } from "@/data/mock-emails";
import type { Email, EmailCategory } from "@/types/email";
import { emailService } from "@/services/email-service";

type InboxState = {
  emails: Email[];
  selectedEmail: Email | null;
  category: EmailCategory | "All";
  loading: boolean;
  search: string;
  fetchEmails: () => Promise<void>;
  selectEmail: (email: Email) => void;
  clearSelectedEmail: () => void;
  markAsRead: (emailId: string) => void;
  setCategory: (category: EmailCategory | "All") => void;
  setSearch: (search: string) => void;
};

export const useInboxStore = create<InboxState>((set, get) => ({
  emails: [],
  selectedEmail: null,
  category: "All",
  loading: false,
  search: "",
  async fetchEmails() {
    set({ loading: true });
    const { category, search } = get();
    try {
      const emails = await emailService.list({
        category: category === "All" ? undefined : category,
        search: search || undefined,
      });

      const selectedEmail =
        emails.find((email) => email.id === get().selectedEmail?.id) ?? emails[0] ?? null;

      set({
        emails,
        selectedEmail,
      });
    } catch (error) {
      const filteredEmails = mockEmails.filter((email) => {
        const categoryMatch = category === "All" || email.category === category;
        const searchMatch =
          !search ||
          [email.subject, email.preview, email.content, email.category]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());

        return categoryMatch && searchMatch;
      });

      set({
        emails: filteredEmails,
        selectedEmail:
          filteredEmails.find((email) => email.id === get().selectedEmail?.id) ??
          filteredEmails[0] ??
          null,
      });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  selectEmail(email) {
    set({ selectedEmail: email });
  },
  clearSelectedEmail() {
    set({ selectedEmail: null });
  },
  markAsRead(emailId) {
    set((state) => {
      const emails = state.emails.map((email) =>
        email.id === emailId ? { ...email, isRead: true } : email,
      );

      const selectedEmail =
        state.selectedEmail?.id === emailId
          ? { ...state.selectedEmail, isRead: true }
          : state.selectedEmail;

      return { emails, selectedEmail };
    });
  },
  setCategory(category) {
    set({ category });
  },
  setSearch(search) {
    set({ search });
  },
}));
