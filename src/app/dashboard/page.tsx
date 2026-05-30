import { Pin } from "lucide-react";

import { CollectionsSection } from "@/components/dashboard/collections-section";
import { ItemsSection } from "@/components/dashboard/items-section";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { getPinnedItems, getRecentItems } from "@/lib/db/items";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [pinnedItems, recentItems] = await Promise.all([
    getPinnedItems(),
    getRecentItems(),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Your developer knowledge hub
        </p>
      </header>

      <StatsCards />
      <CollectionsSection />
      <ItemsSection
        title="Pinned"
        icon={<Pin className="size-4 text-muted-foreground" />}
        items={pinnedItems}
      />
      <ItemsSection title="Recent" items={recentItems} />
    </div>
  );
}
