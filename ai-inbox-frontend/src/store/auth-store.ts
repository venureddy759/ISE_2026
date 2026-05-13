import { create } from "zustand";
import type { AuthUser } from "@/types/auth";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
};

const storedToken = localStorage.getItem("semantic-inbox-token");
const storedUser = localStorage.getItem("semantic-inbox-user");

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  setSession: (token, user) => {
    localStorage.setItem("semantic-inbox-token", token);
    localStorage.setItem("semantic-inbox-user", JSON.stringify(user));
    set({ token, user });
  },
  clearSession: () => {
    localStorage.removeItem("semantic-inbox-token");
    localStorage.removeItem("semantic-inbox-user");
    set({ token: null, user: null });
  },
}));
