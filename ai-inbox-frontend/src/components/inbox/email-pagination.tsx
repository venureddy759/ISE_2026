import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EMAILS_PER_PAGE = 50;

export function getPaginatedEmails<T>(items: T[], page: number, perPage = EMAILS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    page: safePage,
    totalPages,
    items: items.slice(start, start + perPage),
    start: items.length === 0 ? 0 : start + 1,
    end: Math.min(start + perPage, items.length),
  };
}

export function EmailPagination({
  page,
  totalPages,
  totalItems,
  start,
  end,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  start: number;
  end: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1 && totalItems <= EMAILS_PER_PAGE) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border-t border-border/70 px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span>
        Showing {start}-{end} of {totalItems}
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <span className="min-w-20 text-center">
          Page {page} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
