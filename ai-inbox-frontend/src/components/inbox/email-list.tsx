import { useRef } from "react";
import { Archive, MailOpen, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "@/utils/date";
import type { Email } from "@/types/email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/use-translation";
import { cn } from "@/lib/utils";

export function EmailList({
  emails,
  selectedEmailId,
  onPreview,
  onOpen,
}: {
  emails: Email[];
  selectedEmailId?: string;
  onPreview: (email: Email) => void;
  onOpen: (email: Email) => void;
}) {
  const { t } = useTranslation();
  const clickTimeoutRef = useRef<number | null>(null);

  function handleRowClick(email: Email) {
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      onOpen(email);
      return;
    }

    clickTimeoutRef.current = window.setTimeout(() => {
      onPreview(email);
      clickTimeoutRef.current = null;
    }, 240);
  }

  return (
    <div className="overflow-hidden border-y border-border/70 bg-card">
      {emails.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          {t("noEmailsAvailable")}
        </div>
      )}
      {emails.map((email) => (
        <div
          key={email.id}
          className={cn(
            "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 px-3 py-2.5 transition hover:bg-muted/60",
            selectedEmailId === email.id && "bg-sky-500/10 hover:bg-sky-500/10",
            email.isRead ? "text-muted-foreground" : "font-semibold text-foreground",
          )}
          onClick={() => handleRowClick(email)}
        >
          <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            {email.sender.slice(0, 1).toUpperCase()}
            {!email.isRead && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-sky-500 ring-2 ring-card" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-sm">{email.sender}</p>
              <Badge className="shrink-0 text-[10px]">{email.category}</Badge>
              {email.priority === "High" && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" aria-label="High priority" />
              )}
            </div>
            <p className="mt-0.5 truncate text-sm">
              <span className={cn(!email.isRead && "text-foreground")}>{email.subject}</span>
              <span className="mx-2 text-muted-foreground">-</span>
              <span className="font-normal text-muted-foreground">{email.preview}</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <p className="mr-1 whitespace-nowrap text-xs text-muted-foreground">
              {formatDistanceToNow(email.createdAt)}
            </p>
            <div className="hidden items-center gap-1 lg:flex">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={(event) => event.stopPropagation()}>
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={(event) => event.stopPropagation()}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={(event) => event.stopPropagation()}>
                <MailOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
