import { AppSidebarClient } from "@/components/dashboard/app-sidebar-client";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/items";
import { getCurrentUser } from "@/lib/db/user";

export async function AppSidebar() {
  const [itemTypes, collections, user] = await Promise.all([
    getSidebarItemTypes(),
    getSidebarCollections(),
    getCurrentUser(),
  ]);

  return (
    <AppSidebarClient
      itemTypes={itemTypes}
      collections={collections}
      user={user}
    />
  );
}
