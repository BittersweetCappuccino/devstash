import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";
import {
  collections,
  currentUser,
  items,
  itemTypes,
} from "../src/lib/mock-data";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add it to .env before seeding.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function seedUser() {
  await prisma.user.upsert({
    where: { id: currentUser.id },
    update: {},
    create: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      isPro: currentUser.isPro,
    },
  });
}

async function seedItemTypes() {
  for (const t of itemTypes) {
    await prisma.itemType.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        icon: t.icon,
        color: t.color,
        isSystem: t.isSystem,
      },
    });
  }
}

async function seedCollections() {
  for (const c of collections) {
    await prisma.collection.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        description: c.description,
        isFavorite: c.isFavorite,
        defaultTypeId: c.defaultTypeId,
        userId: c.userId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      },
    });
  }
}

async function seedTags() {
  const uniqueTags = Array.from(new Set(items.flatMap((i) => i.tags)));
  for (const name of uniqueTags) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

async function seedItems() {
  for (const item of items) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        contentType: item.contentType,
        content: item.content,
        url: item.url,
        fileUrl: item.fileUrl,
        fileName: item.fileName,
        fileSize: item.fileSize,
        description: item.description,
        language: item.language,
        isFavorite: item.isFavorite,
        isPinned: item.isPinned,
        userId: item.userId,
        itemTypeId: item.itemTypeId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        tags: {
          connect: item.tags.map((name) => ({ name })),
        },
      },
    });
  }
}

async function seedItemCollections() {
  for (const item of items) {
    for (const collectionId of item.collectionIds) {
      await prisma.itemCollection.upsert({
        where: {
          itemId_collectionId: { itemId: item.id, collectionId },
        },
        update: {},
        create: { itemId: item.id, collectionId },
      });
    }
  }
}

async function main() {
  console.log("Seeding database…");
  await seedUser();
  await seedItemTypes();
  await seedCollections();
  await seedTags();
  await seedItems();
  await seedItemCollections();
  console.log(
    `Done. ${itemTypes.length} item types, ${collections.length} collections, ${items.length} items.`
  );
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
