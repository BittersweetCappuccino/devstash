import { Pin, Star } from "lucide-react";

import { TypeIcon, getItemType } from "@/components/dashboard/type-icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/mock-data";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export function ItemCard({ item }: { item: Item }) {
  const type = getItemType(item.itemTypeId);
  const color = type?.color ?? "transparent";

  return (
    <Card
      size="sm"
      className="flex-row items-start gap-3 border-l-4 px-4 py-3 transition-colors hover:bg-card/80"
      style={{ borderLeftColor: color }}
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: `${color}1f` }}
      >
        <TypeIcon typeId={item.itemTypeId} className="size-4" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate text-sm font-medium">{item.title}</h3>
            {item.isPinned ? (
              <Pin className="size-3.5 shrink-0 text-muted-foreground" />
            ) : null}
            {item.isFavorite ? (
              <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
            ) : null}
          </div>
          <time className="shrink-0 text-xs text-muted-foreground">
            {dateFmt.format(item.updatedAt)}
          </time>
        </div>
        {item.description ? (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {item.description}
          </p>
        ) : null}
        {item.tags.length > 0 ? (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="h-5 px-2 text-[10px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
