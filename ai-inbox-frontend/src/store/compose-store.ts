import { create } from "zustand";
import type { Email } from "@/types/email";

type ComposeState = {
  open: boolean;
  draftEmail: Email | null;
  openCompose: (draftEmail?: Email | null) => void;
  closeCompose: () => void;
};

export const useComposeStore = create<ComposeState>((set) => ({
  open: false,
  draftEmail: null,
  openCompose: (draftEmail = null) => set({ open: true, draftEmail }),
  closeCompose: () => set({ open: false, draftEmail: null }),
}));
