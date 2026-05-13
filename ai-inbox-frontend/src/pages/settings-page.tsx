import { Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Settings</p>
        <h1 className="mt-2 text-4xl font-extrabold">Workspace preferences</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-6">
          <Globe2 className="h-5 w-5 text-sky-400" />
          <h2 className="mt-4 text-lg font-bold">Preferred language</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Store default translation preferences per user for future AI translation settings.
          </p>
        </Card>
        <Card className="p-6">
          <ShieldCheck className="h-5 w-5 text-sky-400" />
          <h2 className="mt-4 text-lg font-bold">Authentication</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            JWT-based auth is scaffolded for protected APIs and route guards.
          </p>
        </Card>
        <Card className="p-6">
          <Sparkles className="h-5 w-5 text-sky-400" />
          <h2 className="mt-4 text-lg font-bold">AI provider slots</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Summaries, replies, categorization, and semantic embeddings are isolated behind services.
          </p>
        </Card>
      </div>
    </div>
  );
}
