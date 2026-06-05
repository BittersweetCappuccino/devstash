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

export interface SidebarItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string;
  count: number;
}

export interface ItemTypeMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type ItemTypeMap = Record<string, ItemTypeMeta>;

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

export async function getSidebarItemTypes({
  userId = DEMO_USER_ID,
}: {
  userId?: string;
} = {}): Promise<SidebarItemType[]> {
  const [types, counts] = await Promise.all([
    prisma.itemType.findMany({
      where: { isSystem: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, icon: true, color: true },
    }),
    prisma.item.groupBy({
      by: ["itemTypeId"],
      where: { userId },
      _count: { _all: true },
    }),
  ]);

  const countByType = new Map(counts.map((c) => [c.itemTypeId, c._count._all]));

  return types.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    color: t.color,
    route: `/items/${t.name.toLowerCase()}s`,
    count: countByType.get(t.id) ?? 0,
  }));
}

export async function getItemTypeMap(): Promise<ItemTypeMap> {
  const types = await prisma.itemType.findMany({
    select: { id: true, name: true, icon: true, color: true },
  });
  return Object.fromEntries(types.map((t) => [t.id, t]));
}
