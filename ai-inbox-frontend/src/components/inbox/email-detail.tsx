import { ArrowLeft, Check, CheckCheck, Languages, Reply, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function formatDeadlineLabel(value: string) {
  const deadline = new Date(value);
  if (Number.isNaN(deadline.getTime())) {
    return "No deadline";
  }

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDeadline = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
  const dayDiff = Math.round(
    (startOfDeadline.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (dayDiff < 0) {
    return "Expired";
  }

  if (dayDiff === 0) {
    return "Today";
  }

  if (dayDiff === 1) {
    return "Tomorrow";
  }

  return deadline.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ReadReceipt({ email }: { email: Email }) {
  const { t } = useTranslation();
  const { status, seenAt } = email.readReceipt ?? { status: "sent" as const };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {status === "sent" && <Check className="h-4 w-4" />}
      {status !== "sent" && (
        <CheckCheck className={status === "read" ? "h-4 w-4 text-sky-500" : "h-4 w-4"} />
      )}
      <span>
        {status === "sent" && t("sent")}
        {status === "delivered" && t("delivered")}
        {status === "read" && `${t("seen")} ${seenAt ? formatExactDate(seenAt) : ""}`}
      </span>
    </div>
  );
}

export function EmailDetail({
  email,
  backPath = "/inbox",
  showSuggestionsPanel = true,
}: {
  email: Email;
  backPath?: string;
  showSuggestionsPanel?: boolean;
}) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"original" | "translated">("original");
  const [showSummary, setShowSummary] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const navigate = useNavigate();
  const summary =
    typeof email.summary === "string"
      ? { ...fallbackSummary, shortSummary: email.summary || fallbackSummary.shortSummary }
      : (email.summary ?? fallbackSummary);
  const replySuggestions = email.replySuggestions ?? [];
  const tasks = email.tasks ?? [];
  const extractedTasks = [
    ...(email.extractedTask ? [{ id: `${email.id}-ai-task`, text: email.extractedTask, completed: false }] : []),
    ...tasks,
  ];
  const senderLine = [email.sender, email.senderEmail].filter(Boolean).join(" - ");

  return (
    <div className={showSuggestionsPanel ? "grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]" : "grid gap-4"}>
      <Card className="rounded-lg border-border/70 p-0 shadow-none">
        <div className="border-b border-border/60 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate(backPath)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-2xl font-semibold">{email.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{senderLine}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge>{email.priority}</Badge>
              {email.severity && <Badge>{email.severity}</Badge>}
              <Badge>{email.category}</Badge>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm">
              <Reply className="mr-2 h-4 w-4" />
              {t("reply")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowSummary((value) => !value)}>
              <Sparkles className="mr-2 h-4 w-4" />
              {t("aiSummary")}
            </Button>
            {showSuggestionsPanel && (
              <Button size="sm" variant="outline" onClick={() => setShowReplies((value) => !value)}>
                {t("suggestedReplies")}
              </Button>
            )}
            <Button
              size="sm"
              variant={mode === "original" ? "default" : "outline"}
              onClick={() => setMode("original")}
            >
              {t("original")}
            </Button>
            <Button
              size="sm"
              variant={mode === "translated" ? "default" : "outline"}
              onClick={() => setMode("translated")}
            >
              <Languages className="mr-2 h-4 w-4" />
              {t("translated")}
            </Button>
          </div>
        </div>

        <div className="px-6 py-6">
          <p className="leading-8 text-foreground/90">
            {mode === "original" ? email.content : email.translatedContent || email.content}
          </p>

          {showSummary && (
            <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/50 dark:bg-sky-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                {t("aiSummary")}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{summary.shortSummary}</p>
              {email.severity && (
                <p className="mt-3 text-sm font-semibold text-sky-700 dark:text-sky-300">
                  Severity: {email.severity}
                </p>
              )}
              {email.deadline && (
                <p className="mt-3 text-sm font-semibold text-rose-600">
                  Deadline: {formatDeadlineLabel(email.deadline)}
                </p>
              )}
              <div className="mt-4">
                <p className="text-sm font-semibold">{t("keyPoints")}</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {summary.keyPoints.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold">{t("actionItems")}</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {email.extractedTask && <li>- {email.extractedTask}</li>}
                  {summary.actionItems.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-border/60 pt-4">
            <ReadReceipt email={email} />
          </div>
        </div>
      </Card>

      {showSuggestionsPanel && (
        <Card className="rounded-lg border-border/70 p-5 shadow-none">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t("suggestionsPanel")}
          </h3>
          {showReplies ? (
            <div className="mt-4 space-y-3">
              {replySuggestions.length === 0 && (
                <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                  {t("noSuggestedReplies")}
                </div>
              )}
              {replySuggestions.map((reply) => (
                <div key={reply.id} className="rounded-xl border border-border/60 bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-500">
                    {reply.type}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{reply.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
              {t("suggestedReplies")}
            </div>
          )}

          <div className="mt-6">
            <h4 className="text-sm font-semibold">{t("actionItems")}</h4>
            <div className="mt-3 space-y-2">
              {extractedTasks.length === 0 && (
                <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                  {t("noExtractedTasks")}
                </div>
              )}
              {extractedTasks.map((task) => (
                <div key={task.id} className="rounded-xl border border-border/60 px-4 py-3 text-sm">
                  {task.text}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
