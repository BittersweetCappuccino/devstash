import { MoreHorizontal, Star } from "lucide-react";

import { TypeIcon, getItemType } from "@/components/dashboard/type-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { items, type Collection } from "@/lib/mock-data";

export function CollectionCard({ collection }: { collection: Collection }) {
  const colItems = items.filter((i) => collection.itemIds.includes(i.id));
  const uniqueTypeIds = Array.from(
    new Set(colItems.map((i) => i.itemTypeId))
  );
  const defaultType = collection.defaultTypeId
    ? getItemType(collection.defaultTypeId)
    : undefined;
  const borderColor = defaultType?.color ?? "transparent";

  return (
    <Card
      className="border-l-4 transition-colors hover:bg-card/80"
      style={{ borderLeftColor: borderColor }}
    >
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate font-medium leading-tight">
              {collection.name}
            </h3>
            {collection.isFavorite ? (
              <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
            ) : null}
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="More options"
            className="-mt-1 -mr-1 opacity-0 transition-opacity group-hover/card:opacity-100"
          >
            <MoreHorizontal />
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">
          {collection.itemIds.length} items
        </span>
        {collection.description ? (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {collection.description}
          </p>
        ) : null}
        {uniqueTypeIds.length > 0 ? (
          <div className="mt-1 flex items-center gap-2">
            {uniqueTypeIds.map((typeId) => (
              <TypeIcon key={typeId} typeId={typeId} className="size-4" />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
