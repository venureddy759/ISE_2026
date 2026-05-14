import { useAuthStore } from "@/store/auth-store";
import { normalizeLanguage, translate, translateValue } from "./translations";

export function useTranslation() {
  const language = useAuthStore((state) => state.user?.preferredLanguage);
  const normalizedLanguage = normalizeLanguage(language);

  return {
    language: normalizedLanguage,
    t: (key: Parameters<typeof translate>[1]) => translate(normalizedLanguage, key),
    tv: (value: string) => translateValue(normalizedLanguage, value),
  };
}
