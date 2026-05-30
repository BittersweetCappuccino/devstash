# Current Feature

<!-- Feature name and short description -->

## Status

<!-- Not Started | In Progress | Completed -->

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated, earliest to latest. -->

- **2026-05-24** — Initial project setup with Next.js 16.2.6, React 19.2.4, Tailwind CSS v4, and TypeScript 5 (Completed)
- **2026-05-27** — Added dashboard UI reference screenshots and mock data file (`src/lib/mock-data.ts`) covering user, item types, collections, and items for the dashboard UI (Completed)
- **2026-05-27** — Dashboard UI Phase 1: ShadCN setup, `/dashboard` route, base layout with dark mode, display-only top bar, sidebar/main placeholders (Completed)
- **2026-05-28** — Dashboard UI Phase 2: Collapsible sidebar with item types, favorite/recent collections, user avatar area; sidebar toggle moved to top bar for persistent visibility; collections section hidden in icon-collapsed state (Completed)
- **2026-05-28** — Dashboard UI Phase 3: Main area with 4 stats cards, collections grid (color-coded by default type), pinned items, and 10 most recent items (Completed)
- **2026-05-29** — Database Setup: Prisma 7 + Neon PostgreSQL with initial schema, NextAuth v5 models, `prisma.config.ts`, `PrismaPg` driver adapter singleton, seed script, and `20260529025256_init` migration applied to dev branch (Completed)
- **2026-05-29** — Seed Data Expansion: added `hashedPassword` field to `User` (migration `20260529170631_add_user_hashed_password`), installed `bcryptjs`, updated demo user (Demo User / danielaEM@example.com / bcrypt 12 rounds / isPro=false / emailVerified=now), and added 4 collections (AI Workflows, DevOps, Terminal Commands, Design Resources) plus 3 new React Patterns snippets — 18 new items total (Completed)
- **2026-05-29** — Dashboard Collections: replaced mock collection data in dashboard main area with real Neon data via Prisma; added `src/lib/db/collections.ts` with `getDashboardCollections` (first 6 alphabetically, with per-collection `typeIds` + `itemCount`) and `getCollectionStats`; `CollectionsSection` and `StatsCards` now async server components; dashboard route marked `force-dynamic` (Completed)
- **2026-05-29** — Dashboard Items: replaced mock pinned/recent item data on the dashboard with real Neon data via Prisma; added `src/lib/db/items.ts` with `getPinnedItems`, `getRecentItems` (limit 10), and `getItemStats`; dashboard page is now an async server component fetching pinned + recent in parallel; `StatsCards` parallelizes item + collection stats; `ItemsSection` and `ItemCard` typed against new `DashboardItem`; pinned section auto-hides when empty (Completed)
