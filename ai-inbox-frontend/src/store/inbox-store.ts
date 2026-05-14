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
  fetchFolderEmails: (folder: EmailFolder) => Promise<void>;
  folderCounts: Record<"inbox" | "sent" | "draft" | "starred", number>;
  refreshFolderCounts: () => Promise<void>;
  fetchStarredEmails: () => Promise<void>;
  createEmail: (email: Parameters<typeof emailService.create>[0]) => Promise<Email>;
  updateEmail: (emailId: string, email: Parameters<typeof emailService.update>[1]) => Promise<Email>;
  removeEmail: (emailId: string) => Promise<void>;
  toggleStarred: (email: Email) => Promise<void>;
  selectEmail: (email: Email) => void;
  clearSelectedEmail: () => void;
  markAsRead: (emailId: string) => Promise<void>;
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
  folderCounts: {
    inbox: 0,
    sent: 0,
    draft: 0,
    starred: 0,
  },
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
  async fetchFolderEmails(folder) {
    set({ loading: true });
    try {
      const emails = await emailService.list({ folder });
      const selectedEmail =
        emails.find((email) => email.id === get().selectedEmail?.id) ?? emails[0] ?? null;

      set({ emails, selectedEmail });
    } catch (error) {
      const filteredEmails = mockEmails
        .map(normalizeEmail)
        .filter((email) => (email.folder ?? "inbox") === folder);

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
  async refreshFolderCounts() {
    try {
      const [inbox, sent, draft, allEmails] = await Promise.all([
        emailService.list({ folder: "inbox" }),
        emailService.list({ folder: "sent" }),
        emailService.list({ folder: "draft" }),
        emailService.list(),
      ]);

      set({
        folderCounts: {
          inbox: inbox.length,
          sent: sent.length,
          draft: draft.length,
          starred: allEmails.filter((email) => email.isStarred).length,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  async fetchStarredEmails() {
    set({ loading: true });
    try {
      const emails = (await emailService.list()).filter((email) => email.isStarred);
      set({
        emails,
        selectedEmail: emails.find((email) => email.id === get().selectedEmail?.id) ?? emails[0] ?? null,
      });
    } catch (error) {
      const emails = mockEmails.map(normalizeEmail).filter((email) => email.isStarred);
      set({ emails, selectedEmail: emails[0] ?? null });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  async createEmail(email) {
    const createdEmail = await emailService.create(email);

    set((state) => ({
      emails:
        createdEmail.folder && state.emails.every((item) => (item.folder ?? "inbox") === createdEmail.folder)
          ? [createdEmail, ...state.emails]
          : state.emails,
      selectedEmail: createdEmail,
    }));
    void get().refreshFolderCounts();

    return createdEmail;
  },
  async updateEmail(emailId, email) {
    const updatedEmail = await emailService.update(emailId, email);

    set((state) => ({
      emails: state.emails.map((item) => (item.id === emailId ? updatedEmail : item)),
      selectedEmail: state.selectedEmail?.id === emailId ? updatedEmail : state.selectedEmail,
    }));
    void get().refreshFolderCounts();

    return updatedEmail;
  },
  async removeEmail(emailId) {
    await emailService.remove(emailId);

    set((state) => ({
      emails: state.emails.filter((email) => email.id !== emailId),
      selectedEmail: state.selectedEmail?.id === emailId ? null : state.selectedEmail,
    }));
    void get().refreshFolderCounts();
  },
  async toggleStarred(email) {
    const nextStarred = !email.isStarred;

    set((state) => {
      const emails = state.emails.map((item) =>
        item.id === email.id ? { ...item, isStarred: nextStarred } : item,
      );
      return {
        emails,
        selectedEmail:
          state.selectedEmail?.id === email.id
            ? { ...state.selectedEmail, isStarred: nextStarred }
            : state.selectedEmail,
      };
    });

    try {
      const updatedEmail = await emailService.update(email.id, { isStarred: nextStarred });
      set((state) => ({
        emails: state.emails.map((item) => (item.id === email.id ? updatedEmail : item)),
        selectedEmail: state.selectedEmail?.id === email.id ? updatedEmail : state.selectedEmail,
      }));
      void get().refreshFolderCounts();
    } catch (error) {
      set((state) => {
        const emails = state.emails.map((item) =>
          item.id === email.id ? { ...item, isStarred: email.isStarred } : item,
        );
        return {
          emails,
          selectedEmail:
            state.selectedEmail?.id === email.id
              ? { ...state.selectedEmail, isStarred: email.isStarred }
              : state.selectedEmail,
        };
      });
      console.error(error);
    }
  },
  selectEmail(email) {
    set({ selectedEmail: email });
  },
  clearSelectedEmail() {
    set({ selectedEmail: null });
  },
  async markAsRead(emailId) {
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

    try {
      const updatedEmail = await emailService.markAsRead(emailId);

      set((state) => {
        const emails = state.emails.map((email) =>
          email.id === emailId ? { ...email, ...updatedEmail, isRead: true } : email,
        );

        const selectedEmail =
          state.selectedEmail?.id === emailId
            ? { ...state.selectedEmail, ...updatedEmail, isRead: true }
            : state.selectedEmail;

        return { emails, selectedEmail };
      });
    } catch (error) {
      console.error(error);
    }
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
      folderCounts: {
        inbox: 0,
        sent: 0,
        draft: 0,
        starred: 0,
      },
    });
  },
}));
