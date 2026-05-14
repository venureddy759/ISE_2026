import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailList } from "@/components/inbox/email-list";
import { EmailPagination, getPaginatedEmails } from "@/components/inbox/email-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/i18n/use-translation";
import { useInboxStore } from "@/store/inbox-store";

export function StarredPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    emails,
    selectedEmail,
    loading,
    fetchStarredEmails,
    selectEmail,
    toggleStarred,
    removeEmail,
  } = useInboxStore();

  useEffect(() => {
    setPage(1);
    void fetchStarredEmails();
  }, [fetchStarredEmails]);

  const pagination = useMemo(() => getPaginatedEmails(emails, page), [emails, page]);

  return (
    <div className="flex h-[calc(100vh-7rem)] min-h-[620px] flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm">
      <div className="border-b border-border/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
          <h1 className="text-xl font-semibold">{t("starred")}</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Emails you marked for quick access.</p>
      </div>

      <section className="min-h-0 flex-1 overflow-y-auto">
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
                onPreview={selectEmail}
                onOpen={(email) => {
                  selectEmail(email);
                  navigate(`/email/${email.id}`, { state: { from: "/starred" } });
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
    </div>
  );
}
