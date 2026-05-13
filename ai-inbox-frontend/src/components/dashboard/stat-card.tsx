import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <h3 className="mt-2 text-3xl font-extrabold">{value}</h3>
        </div>
        <div className="rounded-2xl bg-primary/15 p-3 text-primary">{icon}</div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{helper}</p>
    </Card>
  );
}
