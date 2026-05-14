import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { RecentSearches } from "@/components/search/recent-searches";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockEmails } from "@/data/mock-emails";
import { normalizeEmail } from "@/services/email-service";

const starterSearches = [
  "emails about interview prep",
  "finance items needing action",
  "urgent work follow-ups",
];

export function SearchResultsPage() {
  const location = useLocation();
  const initialQuery = new URLSearchParams(location.search).get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query) {
      return [];
    }

    const normalized = query.toLowerCase();
    return mockEmails.map(normalizeEmail).filter((email) =>
      [email.subject, email.preview, email.category, email.content]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Semantic Search</p>
        <h1 className="mt-2 text-4xl font-extrabold">Search by intent, not just keywords</h1>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: emails that mention deadlines and meetings"
          />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </Card>

      <RecentSearches items={starterSearches} onSelect={setQuery} />

      <div className="grid gap-4">
        {results.map((result) => (
          <Card key={result.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">{result.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{result.preview}</p>
              </div>
              <Badge>{result.category}</Badge>
            </div>
          </Card>
        ))}
        {!results.length && (
          <Card className="p-10 text-center text-muted-foreground">
            No results yet. The backend route `POST /search/semantic` is ready for real vector search later.
          </Card>
        )}
      </div>
    </div>
  );
}
