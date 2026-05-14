import { Bot, Inbox, Pencil, Search, Send, Star, Tag, FileText, X, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/use-translation";
import { cn } from "@/lib/utils";
import { useInboxStore } from "@/store/inbox-store";

const links = [
  { to: "/inbox", labelKey: "inbox" as const, icon: Inbox, countKey: "inbox" as const },
  { to: "/ai-inbox", labelKey: "aiInbox" as const, icon: Bot },
  { to: "/sent", labelKey: "sent" as const, icon: Send, countKey: "sent" as const },
  { to: "/drafts", labelKey: "drafts" as const, icon: FileText, countKey: "draft" as const },
  { to: "/starred", labelKey: "starred" as const, icon: Star, countKey: "starred" as const },
  { to: "/search", labelKey: "search" as const, icon: Search },
];

export function Sidebar({
  mobileOpen,
  onClose,
  onCompose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  onCompose: () => void;
}) {
  const { t, tv } = useTranslation();
  const folderCounts = useInboxStore((state) => state.folderCounts);
  const setCategory = useInboxStore((state) => state.setCategory);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/40 transition md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border/70 bg-card/95 p-5 backdrop-blur transition-transform md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-red-500/10 text-red-500">
              <Inbox className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold">PriorityPilot</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="mb-5 justify-start rounded-xl bg-slate-200 px-5 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          onClick={onCompose}
        >
          <Pencil className="mr-2 h-4 w-4" />
          {t("compose")}
        </Button>
        <nav className="space-y-2">
          {links.map(({ to, labelKey, icon: Icon, countKey }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-r-full rounded-l-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {t(labelKey)}
              {countKey && <span className="ml-auto text-xs">{folderCounts[countKey]}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6">
          <div className="flex items-center gap-3 rounded-r-full rounded-l-2xl px-4 py-3 text-sm text-muted-foreground">
            <Tag className="h-4 w-4" />
            {t("categories")}
            <ChevronDown className="ml-auto h-4 w-4" />
          </div>
          {(["Work", "Finance", "College"] as const).map((category) => (
            <button
              key={category}
              type="button"
              className="ml-6 mt-1 flex w-[calc(100%-1.5rem)] items-center gap-3 rounded-r-full rounded-l-2xl px-4 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => {
                setCategory(category);
                navigate("/inbox");
                onClose();
              }}
            >
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              {tv(category)}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
