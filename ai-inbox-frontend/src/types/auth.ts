export interface AuthUser {
  id: string;
  name: string;
  email: string;
  preferredLanguage: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
