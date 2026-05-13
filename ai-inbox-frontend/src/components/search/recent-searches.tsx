import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RecentSearches({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (item: string) => void;
}) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold">Recent searches</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <Button key={item} variant="outline" size="sm" onClick={() => onSelect(item)}>
            <Clock3 className="mr-2 h-4 w-4" />
            {item}
          </Button>
        ))}
      </div>
    </Card>
  );
}
