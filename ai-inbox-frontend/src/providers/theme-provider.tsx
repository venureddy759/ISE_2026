import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: string;
  storageKey?: string;
}>;

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  );
}
