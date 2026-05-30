import { Bookmark, Folder, Layers, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getCollectionStats } from "@/lib/db/collections";
import { getItemStats } from "@/lib/db/items";

export async function StatsCards() {
  const [itemStats, collectionStats] = await Promise.all([
    getItemStats(),
    getCollectionStats(),
  ]);

  const stats = [
    { label: "Items", value: itemStats.total, Icon: Layers },
    { label: "Collections", value: collectionStats.total, Icon: Folder },
    {
      label: "Favorite Items",
      value: itemStats.favorites,
      Icon: Bookmark,
    },
    {
      label: "Favorite Collections",
      value: collectionStats.favorites,
      Icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <Card
          key={s.label}
          size="sm"
          className="flex-row items-center justify-between gap-3 px-4 py-3"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className="text-2xl font-semibold tracking-tight">
              {s.value}
            </span>
          </div>
          <s.Icon className="size-5 shrink-0 text-muted-foreground" />
        </Card>
      ))}
    </div>
  );
}
