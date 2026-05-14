import { Bot, BriefcaseBusiness, Search, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Overview</p>
        <h1 className="mt-3 text-4xl font-extrabold">Your semantic command center</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          This dashboard is designed for email intelligence workflows, not raw mailbox cloning. It surfaces what matters, keeps the architecture AI-ready, and leaves room for your model integrations later.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Unread Focus" value="18" helper="High-signal messages waiting for action." icon={<Sparkles className="h-5 w-5" />} />
        <StatCard label="AI Drafts" value="24" helper="Draft workspace ready for real model wiring." icon={<Bot className="h-5 w-5" />} />
        <StatCard label="Work Emails" value="42" helper="Categorized into productivity-first views." icon={<BriefcaseBusiness className="h-5 w-5" />} />
        <StatCard label="Semantic Queries" value="9" helper="Recent natural-language search prompts." icon={<Search className="h-5 w-5" />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <h2 className="text-xl font-bold">Inbox intelligence map</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { title: "Summary pipeline", text: "Placeholder service returns short summaries, key points, and action items." },
              { title: "Translation layer", text: "Toggle-ready translated content is supported end-to-end in the data model." },
              { title: "Vector-ready search", text: "Semantic search endpoint is structured for pgvector-backed embeddings later." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/60 bg-background/60 p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-bold">Suggested next steps</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>1. Connect the real Nest backend and PostgreSQL instance.</p>
            <p>2. Enable `pgvector` and replace the mock search strategy.</p>
            <p>3. Swap placeholder AI services with your preferred model adapters.</p>
            <p>4. Add message-level analytics, labels, and evaluation tooling.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
