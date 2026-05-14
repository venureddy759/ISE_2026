import { create } from "zustand";
import type { Email } from "@/types/email";

export type ComposeSeed = {
  recipient?: string;
  subject?: string;
  content?: string;
};

type ComposeState = {
  open: boolean;
  draftEmail: Email | null;
  seed: ComposeSeed | null;
  openCompose: (draftEmail?: Email | null, seed?: ComposeSeed | null) => void;
  closeCompose: () => void;
};

export const useComposeStore = create<ComposeState>((set) => ({
  open: false,
  draftEmail: null,
  seed: null,
  openCompose: (draftEmail = null, seed = null) => set({ open: true, draftEmail, seed }),
  closeCompose: () => set({ open: false, draftEmail: null, seed: null }),
}));
