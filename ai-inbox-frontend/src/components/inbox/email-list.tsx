import { useRef } from "react";
import { Archive, MailOpen, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "@/utils/date";
import type { Email } from "@/types/email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    }, 500);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/70">
      {emails.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          No emails available yet.
        </div>
      )}
      {emails.map((email) => (
        <div
          key={email.id}
          className={cn(
            "grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.8fr)_auto] items-center gap-3 border-b border-border/60 bg-card px-4 py-3 transition hover:bg-muted/40",
            selectedEmailId === email.id && "bg-sky-500/10",
            !email.isRead && "font-semibold",
          )}
          onClick={() => handleRowClick(email)}
        >
          <div className="flex min-w-0 items-center gap-3">
            {!email.isRead && <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />}
            <p className="truncate text-sm">{email.sender}</p>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm">
              <span className="font-semibold text-foreground">{email.subject}</span>
              <span className="mx-2 text-muted-foreground">-</span>
              <span className="text-muted-foreground">{email.preview}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{email.priority}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full" onClick={(event) => event.stopPropagation()}>
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={(event) => event.stopPropagation()}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={(event) => event.stopPropagation()}>
              <MailOpen className="h-4 w-4" />
            </Button>
            <p className="whitespace-nowrap text-xs text-muted-foreground">
              {formatDistanceToNow(email.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
