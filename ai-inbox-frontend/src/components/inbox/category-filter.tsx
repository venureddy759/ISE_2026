import type { EmailCategory } from "@/types/email";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/use-translation";
import { cn } from "@/lib/utils";

const categories: Array<EmailCategory | "All"> = [
  "All",
  "Work",
  "Personal",
  "Finance",
  "College",
  "Urgent",
  "Meetings",
];

export function CategoryFilter({
  value,
  onChange,
}: {
  value: EmailCategory | "All";
  onChange: (next: EmailCategory | "All") => void;
}) {
  const { tv } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full border border-border/70",
            value === category && "bg-primary text-primary-foreground",
          )}
          onClick={() => onChange(category)}
        >
          {tv(category)}
        </Button>
      ))}
    </div>
  );
}
