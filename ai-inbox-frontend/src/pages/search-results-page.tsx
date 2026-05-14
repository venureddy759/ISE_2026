import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecentSearches } from "@/components/search/recent-searches";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchService, type SemanticSearchResponse } from "@/services/search-service";
import { useInboxStore } from "@/store/inbox-store";
import { formatExactDate } from "@/utils/date";

const starterSearches = [
  "emails from amazon within this week",
  "urgent work mails from last week",
  "finance messages within 7 days",
];

export function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = new URLSearchParams(location.search).get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [searchResult, setSearchResult] = useState<SemanticSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectEmail = useInboxStore((state) => state.selectEmail);

  async function runSearch(nextQuery = query) {
    const cleanQuery = nextQuery.trim();
    if (!cleanQuery) {
      setSearchResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await searchService.semanticSearch(cleanQuery);
      setSearchResult(result);
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}`, { replace: true });
    } catch (searchError) {
      setSearchResult(null);
      setError("Search is unavailable right now. Please check that the backend is running.");
      console.error(searchError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setQuery(initialQuery);
    void runSearch(initialQuery);
  }, [initialQuery]);

  const results = searchResult?.matches ?? [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Context Search</p>
        <h1 className="mt-2 text-3xl font-semibold">Search by context, sender, topic, and time</h1>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: retrieve mails about amazon within this week"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void runSearch();
              }
            }}
          />
          <Button onClick={() => void runSearch()} disabled={loading || !query.trim()}>
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        {searchResult?.context?.dateRange && (
          <p className="mt-3 text-sm text-muted-foreground">
            Date filter: {searchResult.context.dateRange.label}
          </p>
        )}
      </Card>

      <RecentSearches
        items={starterSearches}
        onSelect={(nextQuery) => {
          setQuery(nextQuery);
          void runSearch(nextQuery);
        }}
      />

      {error && <Card className="p-5 text-sm text-destructive">{error}</Card>}

      <div className="grid gap-4">
        {results.map((result) => (
          <button
            key={result.id}
            type="button"
            className="rounded-lg text-left"
            onClick={() => {
              selectEmail(result);
              navigate(`/email/${result.id}`, { state: { from: "/search" } });
            }}
          >
            <Card className="p-5 transition hover:border-sky-200 hover:bg-muted/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">{result.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {result.sender} - {formatExactDate(result.createdAt)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{result.preview}</p>
              </div>
              <Badge>{result.category}</Badge>
            </div>
            </Card>
          </button>
        ))}
        {!loading && !results.length && (
          <Card className="p-10 text-center text-muted-foreground">
            {query ? "No mails matched that context." : "Use the navbar search or enter context above."}
          </Card>
        )}
      </div>
    </div>
  );
}
