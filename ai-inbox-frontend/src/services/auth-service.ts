import type { AuthResponse } from "@/types/auth";
import { api } from "./api";

type Credentials = {
  email: string;
  password: string;
  name?: string;
};

export const authService = {
  async login(payload: Credentials) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  async register(payload: Credentials) {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },
  async google(token: string) {
    const { data } = await api.post<AuthResponse>("/auth/google", { token });
    return data;
  },
};
