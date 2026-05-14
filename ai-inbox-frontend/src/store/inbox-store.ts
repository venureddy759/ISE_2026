import { create } from "zustand";
import { mockEmails } from "@/data/mock-emails";
import type { Email, EmailCategory, EmailFolder } from "@/types/email";
import { emailService, normalizeEmail } from "@/services/email-service";

type InboxState = {
  emails: Email[];
  selectedEmail: Email | null;
  category: EmailCategory | "All";
  loading: boolean;
  search: string;
  fetchEmails: (folder?: EmailFolder) => Promise<void>;
  selectEmail: (email: Email) => void;
  clearSelectedEmail: () => void;
  markAsRead: (emailId: string) => void;
  setCategory: (category: EmailCategory | "All") => void;
  setSearch: (search: string) => void;
  reset: () => void;
};

export const useInboxStore = create<InboxState>((set, get) => ({
  emails: [],
  selectedEmail: null,
  category: "All",
  loading: false,
  search: "",
  async fetchEmails(folder = "inbox") {
    set({ loading: true });
    const { category, search } = get();
    try {
      const emails = await emailService.list({
        category: category === "All" || category === "Urgent" ? undefined : category,
        search: search || undefined,
        folder,
      });
      const visibleEmails =
        category === "Urgent" ? emails.filter((email) => email.priority === "High") : emails;

      const selectedEmail =
        visibleEmails.find((email) => email.id === get().selectedEmail?.id) ??
        visibleEmails[0] ??
        null;

      set({
        emails: visibleEmails,
        selectedEmail,
      });
    } catch (error) {
      const filteredEmails = mockEmails.map(normalizeEmail).filter((email) => {
        const categoryMatch =
          category === "All" ||
          (category === "Urgent" ? email.priority === "High" : email.category === category);
        const folderMatch = (email.folder ?? "inbox") === folder;
        const searchMatch =
          !search ||
          [email.subject, email.preview, email.content, email.category]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());

        return categoryMatch && folderMatch && searchMatch;
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
  reset() {
    set({
      emails: [],
      selectedEmail: null,
      category: "All",
      loading: false,
      search: "",
    });
  },
}));
