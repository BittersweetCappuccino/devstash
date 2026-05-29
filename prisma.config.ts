import "dotenv/config";
import { defineConfig } from "prisma/config";

// Read DATABASE_URL directly (with empty fallback) instead of `env()` so that
// commands that don't need a connection — e.g. `prisma generate` — work in
// fresh checkouts without a configured .env. Commands that do need a connection
// will fail at the engine layer with a clear message.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
