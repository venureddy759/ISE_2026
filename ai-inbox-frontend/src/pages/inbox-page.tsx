import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "@/components/inbox/category-filter";
import { EmailList } from "@/components/inbox/email-list";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInboxStore } from "@/store/inbox-store";

export function InboxPage() {
  const navigate = useNavigate();
  const {
    emails,
    selectedEmail,
    category,
    loading,
    search,
    fetchEmails,
    clearSelectedEmail,
    markAsRead,
    selectEmail,
    setCategory,
    setSearch,
  } = useInboxStore();

  useEffect(() => {
    void fetchEmails();
  }, [category, search, fetchEmails]);

  return (
    <div className="space-y-4">
      <CategoryFilter value={category} onChange={setCategory} />

      <div className={selectedEmail ? "grid gap-4 xl:grid-cols-[1.45fr_0.9fr]" : "block"}>
        <Card className="overflow-hidden rounded-2xl border-border/70 p-0 shadow-none">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.8fr)_auto] gap-3 border-b border-border/60 bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <p>Sender</p>
            <p>Message</p>
            <p>Actions</p>
          </div>
          {loading ? (
            <div className="space-y-3 p-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <EmailList
              emails={emails}
              selectedEmailId={selectedEmail?.id}
              onPreview={(email) => {
                selectEmail(email);
                markAsRead(email.id);
              }}
              onOpen={(email) => {
                selectEmail(email);
                markAsRead(email.id);
                navigate(`/emails/${email.id}`);
              }}
            />
          )}
        </Card>

        {selectedEmail && (
          <Card className="rounded-2xl border-border/70 p-5 shadow-none">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-500">
                  AI Summary
                </p>
                <h2 className="mt-2 text-lg font-semibold">{selectedEmail.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{selectedEmail.sender}</p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sky-500" />
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  onClick={clearSelectedEmail}
                  aria-label="Close AI summary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Badge>{selectedEmail.priority}</Badge>
              <Badge>{selectedEmail.category}</Badge>
            </div>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              {selectedEmail.summary.shortSummary}
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold">Key points</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {selectedEmail.summary.keyPoints.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold">Action items</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {selectedEmail.summary.actionItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
