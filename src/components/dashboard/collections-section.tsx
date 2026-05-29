import { CollectionCard } from "@/components/dashboard/collection-card";
import { getDashboardCollections } from "@/lib/db/collections";

export async function CollectionsSection() {
  const collections = await getDashboardCollections();

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <a
          href="#"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </a>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </section>
  );
}
