import "server-only";

import { prisma } from "@/lib/prisma";

// Demo user until auth is wired up. Matches the seeded user id.
const DEMO_USER_ID = "user_1";

export interface DashboardItem {
  id: string;
  title: string;
  description: string | null;
  isPinned: boolean;
  isFavorite: boolean;
  itemTypeId: string;
  tags: string[];
  updatedAt: Date;
}

export interface ItemStats {
  total: number;
  favorites: number;
}

const dashboardItemSelect = {
  id: true,
  title: true,
  description: true,
  isPinned: true,
  isFavorite: true,
  itemTypeId: true,
  updatedAt: true,
  tags: { select: { name: true } },
} as const;

type ItemRow = {
  id: string;
  title: string;
  description: string | null;
  isPinned: boolean;
  isFavorite: boolean;
  itemTypeId: string;
  updatedAt: Date;
  tags: { name: string }[];
};

function toDashboardItem(row: ItemRow): DashboardItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    isPinned: row.isPinned,
    isFavorite: row.isFavorite,
    itemTypeId: row.itemTypeId,
    tags: row.tags.map((t) => t.name),
    updatedAt: row.updatedAt,
  };
}

export async function getPinnedItems({
  userId = DEMO_USER_ID,
}: {
  userId?: string;
} = {}): Promise<DashboardItem[]> {
  const rows = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: dashboardItemSelect,
  });
  return rows.map(toDashboardItem);
}

export async function getRecentItems({
  userId = DEMO_USER_ID,
  limit = 10,
}: {
  userId?: string;
  limit?: number;
} = {}): Promise<DashboardItem[]> {
  const rows = await prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: dashboardItemSelect,
  });
  return rows.map(toDashboardItem);
}

export async function getItemStats({
  userId = DEMO_USER_ID,
}: {
  userId?: string;
} = {}): Promise<ItemStats> {
  const [total, favorites] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}
