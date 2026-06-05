import { ItemCard } from "@/components/dashboard/item-card";
import type { DashboardItem, ItemTypeMap } from "@/lib/db/items";

export function ItemsSection({
  title,
  icon,
  items,
  typeMap,
}: {
  title: string;
  icon?: React.ReactNode;
  items: DashboardItem[];
  typeMap: ItemTypeMap;
}) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} typeMap={typeMap} />
        ))}
      </div>
    </section>
  );
}
