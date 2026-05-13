import { ArrowLeft, Check, CheckCheck, Languages, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Email } from "@/types/email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "@/utils/date";

function ReadReceipt({ email }: { email: Email }) {
  const { status, seenAt } = email.readReceipt ?? { status: "sent" as const };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {status === "sent" && <Check className="h-4 w-4" />}
      {status !== "sent" && (
        <CheckCheck className={status === "read" ? "h-4 w-4 text-sky-500" : "h-4 w-4"} />
      )}
      <span>
        {status === "sent" && "Sent"}
        {status === "delivered" && "Delivered"}
        {status === "read" && `Seen ${seenAt ? formatDistanceToNow(seenAt) : ""}`}
      </span>
    </div>
  );
}

export function EmailDetail({ email }: { email: Email }) {
  const [mode, setMode] = useState<"original" | "translated">("original");
  const [showSummary, setShowSummary] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="rounded-2xl border-border/70 p-0 shadow-none">
        <div className="border-b border-border/60 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/inbox")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-2xl font-semibold">{email.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {email.sender} • {email.senderEmail}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge>{email.priority}</Badge>
              <Badge>{email.category}</Badge>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowSummary((value) => !value)}>
              <Sparkles className="mr-2 h-4 w-4" />
              AI Summary
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowReplies((value) => !value)}>
              Suggested Replies
            </Button>
            <Button
              size="sm"
              variant={mode === "original" ? "default" : "outline"}
              onClick={() => setMode("original")}
            >
              Original
            </Button>
            <Button
              size="sm"
              variant={mode === "translated" ? "default" : "outline"}
              onClick={() => setMode("translated")}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translated
            </Button>
          </div>
        </div>

        <div className="px-6 py-6">
          <p className="leading-8 text-foreground/90">
            {mode === "original" ? email.content : email.translatedContent}
          </p>

          {showSummary && (
            <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/50 dark:bg-sky-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                AI Summary
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{email.summary.shortSummary}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Key points</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {email.summary.keyPoints.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold">Action items</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {email.summary.actionItems.map((item) => (
                    <li key={item}>• {item}</li>
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

      <Card className="rounded-2xl border-border/70 p-5 shadow-none">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Suggestions Panel
        </h3>
        {showReplies ? (
          <div className="mt-4 space-y-3">
            {email.replySuggestions.map((reply) => (
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
            Click `Suggested Replies` inside the mail to open the reply suggestion box here.
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-sm font-semibold">Extracted Tasks</h4>
          <div className="mt-3 space-y-2">
            {email.tasks.map((task) => (
              <div key={task.id} className="rounded-xl border border-border/60 px-4 py-3 text-sm">
                {task.text}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
