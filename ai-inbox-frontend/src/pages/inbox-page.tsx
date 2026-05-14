import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "@/components/inbox/category-filter";
import { EmailList } from "@/components/inbox/email-list";
import { EmailPagination, getPaginatedEmails } from "@/components/inbox/email-pagination";
import { EmailSummaryPanel } from "@/components/inbox/email-summary-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/i18n/use-translation";
import { aiService } from "@/services/ai-service";
import { useInboxStore } from "@/store/inbox-store";
import type { Email } from "@/types/email";

export function InboxPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [summarizingEmailId, setSummarizingEmailId] = useState<string | null>(null);
  const [summarizedEmailIds, setSummarizedEmailIds] = useState<Set<string>>(() => new Set());
  const navigate = useNavigate();
  const {
    emails,
    selectedEmail,
    category,
    loading,
    fetchEmails,
    clearSelectedEmail,
    markAsRead,
    selectEmail,
    setCategory,
    toggleStarred,
    removeEmail,
  } = useInboxStore();

  useEffect(() => {
    setPage(1);
    void fetchEmails("inbox");
  }, [category, fetchEmails]);

  const pagination = useMemo(() => getPaginatedEmails(emails, page), [emails, page]);
  const summarizePreviewEmail = useCallback(
    async (email: Email) => {
      if (summarizedEmailIds.has(email.id) || summarizingEmailId === email.id) {
        return;
      }

      setSummarizingEmailId(email.id);
      try {
        const summarizedEmail = await aiService.summarizeEmail(email.id);
        selectEmail(summarizedEmail);
        setSummarizedEmailIds((current) => new Set(current).add(email.id));
      } catch (error) {
        console.error(error);
      } finally {
        setSummarizingEmailId(null);
      }
    },
    [selectEmail, summarizedEmailIds, summarizingEmailId],
  );

  return (
    <div className="flex h-[calc(100vh-7rem)] min-h-[620px] flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm">
      <div className="border-b border-border/70 px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold">{t("inbox")}</h1>
            <p className="text-sm text-muted-foreground">{t("allMessages")}</p>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </div>

      <div
        className={
          selectedEmail
            ? "grid min-h-0 flex-1 lg:grid-cols-[minmax(420px,1fr)_380px]"
            : "grid min-h-0 flex-1"
        }
      >
        <section className="min-h-0 overflow-y-auto border-b border-border/70 lg:border-b-0 lg:border-r">
          {loading ? (
            <div className="space-y-3 p-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="flex min-h-full flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto">
                <EmailList
                  emails={pagination.items}
                  selectedEmailId={selectedEmail?.id}
                  onPreview={(email) => {
                    selectEmail(email);
                    markAsRead(email.id);
                  }}
                  onOpen={(email) => {
                    selectEmail(email);
                    markAsRead(email.id);
                    navigate(`/email/${email.id}`, { state: { from: "/inbox" } });
                  }}
                  onToggleStarred={toggleStarred}
                  onDelete={(email) => {
                    void removeEmail(email.id);
                  }}
                />
              </div>
              <EmailPagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={emails.length}
                start={pagination.start}
                end={pagination.end}
                onPageChange={setPage}
              />
            </div>
          )}
        </section>

        {selectedEmail && (
          <section className="min-h-0 overflow-y-auto bg-background/60 p-4">
            <EmailSummaryPanel
              email={selectedEmail}
              onClose={clearSelectedEmail}
              loading={summarizingEmailId === selectedEmail.id}
              onSummarize={summarizePreviewEmail}
              onOpen={(email) => {
                selectEmail(email);
                markAsRead(email.id);
                navigate(`/email/${email.id}`, { state: { from: "/inbox" } });
              }}
            />
          </section>
        )}
      </div>
    </div>
  );
}
