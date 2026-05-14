import { LogOut, Menu, MoonStar, PanelLeft, Search, Settings2, SunMedium, UserCircle2 } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ComposeModal } from "@/components/compose/compose-modal";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/i18n/use-translation";
import { useAuthStore } from "@/store/auth-store";
import { useComposeStore } from "@/store/compose-store";
import { useInboxStore } from "@/store/inbox-store";
import { Sidebar } from "./sidebar";

export function AppShell() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);
  const openCompose = useComposeStore((state) => state.openCompose);
  const { reset: resetInbox, refreshFolderCounts } = useInboxStore();

  useEffect(() => {
    void refreshFolderCounts();
  }, [refreshFolderCounts]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        mobileOpen={open}
        onClose={() => setOpen(false)}
        onCompose={() => {
          openCompose();
          setOpen(false);
        }}
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95">
          <div className="flex h-16 items-center gap-3 px-4 md:px-8">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden items-center gap-2 md:flex">
              <PanelLeft className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t("mail")}</span>
            </div>
            <div className="relative ml-auto max-w-2xl flex-1">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("searchMail")}
                className="rounded-full border-border/70 bg-muted/50 pl-9"
                onKeyDown={(event) => {
                  const query = event.currentTarget.value.trim();
                  if (event.key === "Enter" && query) {
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                  }
                }}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-3"
              onClick={() => {
                clearSession();
                resetInbox();
                navigate("/login");
              }}
            >
              <UserCircle2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{t("account")}</span>
              <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
      <ComposeModal onSent={() => navigate("/sent")} />
    </div>
  );
}
