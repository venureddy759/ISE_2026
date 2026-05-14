import { ArrowRight, Sparkles, X } from "lucide-react";
import type { Email } from "@/types/email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/i18n/use-translation";
import { formatExactDate } from "@/utils/date";

const fallbackSummary = {
  shortSummary: "No AI summary is available for this email yet.",
  keyPoints: [],
  actionItems: [],
};

export function EmailSummaryPanel({
  email,
  onClose,
  onOpen,
}: {
  email: Email | null;
  onClose: () => void;
  onOpen: (email: Email) => void;
}) {
  const { t } = useTranslation();

  if (!email) {
    return (
      <div className="grid h-full place-items-center rounded-lg border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">
        {t("selectEmailSummary")}
      </div>
    );
  }

  const summary =
    typeof email.summary === "string"
      ? { ...fallbackSummary, shortSummary: email.summary || fallbackSummary.shortSummary }
      : (email.summary ?? fallbackSummary);

  return (
    <Card className="h-full rounded-lg border-border/70 p-5 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-500">
            <Sparkles className="h-4 w-4" />
            {t("summary")}
          </div>
          <h2 className="mt-3 line-clamp-2 text-xl font-semibold">{email.subject}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {email.sender} - {formatExactDate(email.createdAt)}
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <div className="flex flex-col gap-2">
            <Badge>{email.priority}</Badge>
            <Badge>{email.category}</Badge>
          </div>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            onClick={onClose}
            aria-label={t("closeSummary")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-muted-foreground">{summary.shortSummary}</p>

      <div className="mt-5">
        <p className="text-sm font-semibold">{t("keyPoints")}</p>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          {summary.keyPoints.length === 0 && <li>{t("noKeyPoints")}</li>}
          {summary.keyPoints.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold">{t("actionItems")}</p>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          {summary.actionItems.length === 0 && <li>{t("noActionItems")}</li>}
          {summary.actionItems.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      <Button className="mt-6 w-full" onClick={() => onOpen(email)}>
        {t("openFullEmail")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Tip: double click an email row to open it directly.
      </p>
    </Card>
  );
}
