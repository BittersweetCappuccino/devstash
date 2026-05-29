import "server-only";

import { prisma } from "@/lib/prisma";

// Demo user until auth is wired up. Matches the seeded user id.
const DEMO_USER_ID = "user_1";

export interface DashboardCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultTypeId: string | null;
  itemCount: number;
  typeIds: string[];
}

export interface CollectionStats {
  total: number;
  favorites: number;
}

export async function getDashboardCollections({
  userId = DEMO_USER_ID,
  limit = 6,
}: {
  userId?: string;
  limit?: number;
} = {}): Promise<DashboardCollection[]> {
  const rows = await prisma.collection.findMany({
    where: { userId },
    orderBy: { name: "asc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      defaultTypeId: true,
      _count: { select: { items: true } },
      items: {
        select: { item: { select: { itemTypeId: true } } },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    isFavorite: row.isFavorite,
    defaultTypeId: row.defaultTypeId,
    itemCount: row._count.items,
    typeIds: Array.from(new Set(row.items.map((i) => i.item.itemTypeId))),
  }));
}

export async function getCollectionStats({
  userId = DEMO_USER_ID,
}: {
  userId?: string;
} = {}): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}
