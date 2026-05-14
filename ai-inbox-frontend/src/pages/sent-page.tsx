import { Search, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailList } from "@/components/inbox/email-list";
import { EmailPagination, getPaginatedEmails } from "@/components/inbox/email-pagination";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/i18n/use-translation";
import { useInboxStore } from "@/store/inbox-store";

export function SentPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    emails,
    selectedEmail,
    category,
    loading,
    search,
    fetchEmails,
    selectEmail,
    setCategory,
    setSearch,
  } = useInboxStore();

  useEffect(() => {
    if (category !== "All") {
      setCategory("All");
      return;
    }

    setPage(1);
    void fetchEmails("sent");
  }, [category, search, fetchEmails, setCategory]);

  const pagination = useMemo(() => getPaginatedEmails(emails, page), [emails, page]);

  return (
    <div className="flex h-[calc(100vh-7rem)] min-h-[620px] flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm">
      <div className="border-b border-border/70 px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-xl font-semibold">{t("sent")}</h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{t("messagesYouSent")}</p>
          </div>
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchSentMail")}
              className="rounded-full bg-background pl-9"
            />
          </div>
        </div>
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
                onPreview={(email) => {
                  selectEmail(email);
                  navigate(`/email/${email.id}`);
                }}
                onOpen={(email) => {
                  selectEmail(email);
                  navigate(`/email/${email.id}`);
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
