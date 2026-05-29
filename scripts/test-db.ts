import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add it to .env before running.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  console.log("Testing DB connection…\n");

  const [
    userCount,
    itemTypeCount,
    collectionCount,
    itemCount,
    tagCount,
    linkCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.itemType.count(),
    prisma.collection.count(),
    prisma.item.count(),
    prisma.tag.count(),
    prisma.itemCollection.count(),
  ]);

  console.log("Row counts:");
  console.table({
    User: userCount,
    ItemType: itemTypeCount,
    Collection: collectionCount,
    Item: itemCount,
    Tag: tagCount,
    ItemCollection: linkCount,
  });

  const sample = await prisma.item.findFirst({
    include: {
      itemType: true,
      tags: true,
      collections: { include: { collection: true } },
    },
  });

  if (sample) {
    console.log("\nSample item:");
    console.log(JSON.stringify(sample, null, 2));
  } else {
    console.log("\nNo items found. Run `npm run db:seed` to populate.");
  }
}

main()
  .catch((err) => {
    console.error("DB test failed:", err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
