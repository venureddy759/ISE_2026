import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Work: "bg-sky-500/15 text-sky-300",
  Personal: "bg-pink-500/15 text-pink-300",
  Finance: "bg-emerald-500/15 text-emerald-300",
  College: "bg-violet-500/15 text-violet-300",
  Urgent: "bg-rose-500/15 text-rose-300",
  Meetings: "bg-amber-500/15 text-amber-300",
  High: "bg-rose-500/15 text-rose-300",
  Medium: "bg-amber-500/15 text-amber-300",
  Low: "bg-emerald-500/15 text-emerald-300",
};

export function Badge({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const key = String(children);
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[key] ?? "bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
