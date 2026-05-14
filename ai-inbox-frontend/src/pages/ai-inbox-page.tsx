import {
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Clock3,
  ExternalLink,
  PenLine,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { aiService, type AiDashboard, type AiDashboardEmail } from "@/services/ai-service";
import { useAuthStore } from "@/store/auth-store";
import { useInboxStore } from "@/store/inbox-store";
import type { Email } from "@/types/email";
import { formatExactDate } from "@/utils/date";

type SummaryKey = "all" | "attention" | "deadlines" | "waiting" | "resolved";

type SummarySection = {
  key: SummaryKey;
  title: string;
  description: string;
  emails: Array<Email | AiDashboardEmail>;
  reason: (email: Email | AiDashboardEmail) => string;
};

function getSummary(email: { summary?: unknown }) {
  if (typeof email.summary === "string") {
    return email.summary;
  }

  if (email.summary && typeof email.summary === "object" && "shortSummary" in email.summary) {
    return String(email.summary.shortSummary);
  }

  return "No AI summary available yet.";
}

function formatDeadlineLabel(value?: string | null) {
  if (!value) {
    return "No deadline";
  }

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

function SummaryModal({
  open,
  section,
  sections,
  onClose,
  onOpenEmail,
}: {
  open: boolean;
  section: SummarySection | null;
  sections: SummarySection[];
  onClose: () => void;
  onOpenEmail: (email: Email | AiDashboardEmail) => void;
}) {
  if (!open || !section) {
    return null;
  }

  const visibleSections = section.key === "all" ? sections.filter((item) => item.key !== "all") : [section];
  const totalEmails = visibleSections.reduce((count, item) => count + item.emails.length, 0);

  return createPortal(
    <div className="fixed inset-0 z-[9999] grid min-h-screen w-screen place-items-center bg-black/45 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border/70 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
              Last week summary
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{section.title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{section.description}</p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            onClick={onClose}
            aria-label="Close summary modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(88vh-8rem)] overflow-y-auto p-5">
          <div className="mb-5 rounded-xl border border-border/70 bg-muted/30 p-4">
            <p className="text-sm font-semibold">
              AI reviewed {totalEmails} email{totalEmails === 1 ? "" : "s"} for this view.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              This is a temporary last-week style summary using your current email data until date-based
              analytics are wired in.
            </p>
          </div>

          <div className="space-y-6">
            {visibleSections.map((item) => (
              <section key={item.key}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Badge>{item.emails.length}</Badge>
                </div>

                <div className="space-y-3">
                  {item.emails.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                      No emails matched this section.
                    </div>
                  )}
                  {item.emails.map((email) => (
                    <div key={`${item.key}-${email.id}`} className="rounded-xl border border-border/70 bg-background p-4">
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold">{email.subject}</p>
                            <Badge>{email.category}</Badge>
                            <Badge>{email.priority}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {email.sender} - {email.createdAt ? formatExactDate(email.createdAt) : "Unknown date"}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => onOpenEmail(email)}>
                          Open Email
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{getSummary(email)}</p>
                      <div className="mt-3 rounded-lg bg-muted/40 p-3 text-sm">
                        <span className="font-semibold">Why AI included this: </span>
                        <span className="text-muted-foreground">{item.reason(email)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function AiInboxPage() {
  const navigate = useNavigate();
  const [activeSummary, setActiveSummary] = useState<SummaryKey | null>(null);
  const [dashboard, setDashboard] = useState<AiDashboard | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const { emails, loading, fetchEmails } = useInboxStore();
  const firstName = user?.name?.trim().split(/\s+/)[0] || "there";
  const highPriorityEmails = emails.filter((email) => email.priority === "High");
  const emailsWithTasks = emails.filter((email) => (email.tasks ?? []).length > 0);
  const waitingForReplies = emails.filter((email) => (email.replySuggestions ?? []).length > 0);
  const autoResolved = emails.filter((email) => email.isRead && (email.tasks ?? []).length === 0);
  const importantEmails = dashboard?.importantForYou ?? [];
  const recommendedActions = emails
    .flatMap((email) => (email.tasks ?? []).map((task) => ({ ...task, email })))
    .slice(0, 4);

  useEffect(() => {
    void fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    async function fetchDashboard() {
      setDashboardLoading(true);
      setDashboardError(null);
      try {
        setDashboard(await aiService.getDashboard());
      } catch (error) {
        setDashboardError("AI dashboard data is unavailable right now.");
        console.error(error);
      } finally {
        setDashboardLoading(false);
      }
    }

    void fetchDashboard();
  }, []);

  const summarySections = useMemo<SummarySection[]>(() => [
    {
      key: "all",
      title: "Full AI Summary",
      description: "A consolidated last-week communication summary across attention, deadlines, replies, and resolved mail.",
      emails,
      reason: () => "This email contributes to the overall communication picture for the week.",
    },
    {
      key: "attention",
      title: "Needs Attention",
      description: "Unread or high-priority emails that likely need your next decision.",
      emails: dashboard?.needsAttention ?? [],
      reason: () => "The classification model marked this email as needing attention.",
    },
    {
      key: "deadlines",
      title: "Deadlines",
      description: "Emails with extracted tasks or action items that can become reminders.",
      emails: dashboard?.deadlines ?? [],
      reason: () => "The classification model marked this email as having a deadline in the next 7 days.",
    },
    {
      key: "waiting",
      title: "Waiting for Replies",
      description: "Conversations where AI found reply suggestions or response paths.",
      emails: dashboard?.waitingForReplies ?? [],
      reason: () => "The classification model marked this email as waiting for your response.",
    },
    {
      key: "resolved",
      title: "Auto Resolved",
      description: "Read messages without extracted tasks that appear low effort or already handled.",
      emails: dashboard?.autoResolved ?? [],
      reason: () => "It is already read and AI found no pending extracted tasks.",
    },
  ], [dashboard, emails]);
  const activeSection = summarySections.find((section) => section.key === activeSummary) ?? null;

  if (loading || dashboardLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  const stats = [
    {
      label: "Needs Attention",
      summaryKey: "attention" as const,
      value: dashboard?.needsAttentionCount ?? highPriorityEmails.length,
      helper: "important emails",
      icon: AlertCircle,
      className: "border-rose-200 bg-rose-50/80 text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/20",
    },
    {
      label: "Deadlines",
      summaryKey: "deadlines" as const,
      value: dashboard?.deadlinesCount ?? emailsWithTasks.length,
      helper: "in the next 7 days",
      icon: CalendarClock,
      className: "border-orange-200 bg-orange-50/80 text-orange-600 dark:border-orange-900/60 dark:bg-orange-950/20",
    },
    {
      label: "Waiting for Replies",
      summaryKey: "waiting" as const,
      value: dashboard?.waitingForRepliesCount ?? waitingForReplies.length,
      helper: "conversations",
      icon: Clock3,
      className: "border-blue-200 bg-blue-50/80 text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/20",
    },
    {
      label: "Auto Resolved",
      summaryKey: "resolved" as const,
      value: dashboard?.autoResolvedCount ?? autoResolved.length,
      helper: "emails handled",
      icon: CheckCircle2,
      className: "border-emerald-200 bg-emerald-50/80 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/20",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <Card className="rounded-2xl border-border/70 bg-card/95 p-6 shadow-none md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Good morning, {firstName}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">AI has prioritized what matters</p>
          </div>
          <Button variant="outline" className="w-fit rounded-xl" onClick={() => setActiveSummary("all")}>
            View Full Summary
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, helper, icon: Icon, className, summaryKey }) => (
            <button
              key={label}
              type="button"
              className={`rounded-xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
              onClick={() => setActiveSummary(summaryKey)}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold">{label}</p>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-current/10">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-7 text-4xl font-semibold text-foreground">{value}</p>
              <p className="mt-2 text-sm text-foreground/80">{helper}</p>
            </button>
          ))}
        </div>
        {dashboardError && (
          <p className="mt-4 text-sm text-muted-foreground">{dashboardError}</p>
        )}
      </Card>

      <Card className="rounded-2xl border-rose-100 bg-rose-50/30 p-5 shadow-none dark:border-rose-900/40 dark:bg-rose-950/10 md:p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-5 w-5 text-rose-500" />
          <div>
            <h2 className="text-xl font-semibold">Important for you</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              High priority emails that need your immediate attention
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {importantEmails.length === 0 && (
            <div className="rounded-xl border border-dashed border-rose-100 bg-card p-5 text-sm text-muted-foreground dark:border-rose-900/30">
              No high priority or high severity emails found yet.
            </div>
          )}
          {importantEmails.map((email) => {
            const firstTask = email.extractedTask ?? "Review and respond";
            const deadline = formatDeadlineLabel(email.deadline);
            return (
              <div
                key={email.id}
                className="grid gap-4 rounded-xl border border-rose-100 bg-card p-4 shadow-sm transition hover:border-rose-200 hover:shadow-md dark:border-rose-900/30 md:grid-cols-[auto_1.2fr_0.7fr_0.9fr_0.8fr_auto] md:items-center"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-lg font-semibold text-white">
                  {email.sender.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">Context</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{getSummary(email)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Deadline</p>
                  <p className="mt-2 text-sm font-semibold text-rose-600">
                    {deadline}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Action Needed</p>
                  <p className="mt-2 text-sm text-muted-foreground">{firstTask}</p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {email.createdAt ? formatExactDate(email.createdAt) : "Unknown date"}
                  </p>
                  <Badge>{email.category}</Badge>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900"
                  onClick={() => navigate(`/email/${email.id}`, { state: { from: "/ai-inbox" } })}
                >
                  Open Email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="mx-auto mt-5 flex items-center gap-2 text-sm font-semibold text-rose-600"
          onClick={() => navigate("/inbox")}
        >
          View all high priority emails
          <ArrowRight className="h-4 w-4" />
        </button>
      </Card>

      <Card className="rounded-2xl border-border/70 p-5 shadow-none md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Target className="mt-1 h-5 w-5 text-rose-500" />
            <div>
              <h2 className="text-xl font-semibold">Recommended Actions</h2>
              <p className="mt-1 text-sm text-muted-foreground">AI suggests these actions to save your time</p>
            </div>
          </div>
          <Button variant="ghost" className="text-blue-600">
            See all
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(recommendedActions.length ? recommendedActions : emails.slice(0, 4).map((email) => ({
            id: email.id,
            text: "Review email",
            completed: false,
            email,
          }))).map((action, index) => {
            const actions = [
              { label: "Draft Reply", icon: PenLine, className: "bg-rose-100 text-rose-600 hover:bg-rose-100/80" },
              { label: "Pay Now", icon: ExternalLink, className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80" },
              { label: "Set Reminder", icon: Bell, className: "bg-blue-100 text-blue-700 hover:bg-blue-100/80" },
              { label: "View Calendar", icon: Calendar, className: "bg-violet-100 text-violet-700 hover:bg-violet-100/80" },
            ];
            const config = actions[index % actions.length];
            const Icon = config.icon;

            return (
              <div key={action.id} className="rounded-xl border border-border/70 bg-card p-4">
                <p className="line-clamp-1 font-semibold">{action.text}</p>
                <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{action.email.subject}</p>
                <Button className={`mt-5 w-full rounded-lg ${config.className}`} variant="secondary">
                  {config.label}
                  <Icon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      <SummaryModal
        open={activeSummary !== null}
        section={activeSection}
        sections={summarySections}
        onClose={() => setActiveSummary(null)}
        onOpenEmail={(email) => {
          setActiveSummary(null);
          navigate(`/email/${email.id}`, { state: { from: "/ai-inbox" } });
        }}
      />
    </div>
  );
}
