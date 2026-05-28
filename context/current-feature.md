# Current Feature

Dashboard UI Phase 2 — Collapsible sidebar with item types, favorite collections, recent collections, and user avatar area.

## Status

Completed

## Goals

- Collapsible sidebar
- Items/types with links to /items/TYPE (eg. /items/snippets)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Drawer icon to open/close sidebar (icon/toggle already in place; don't change its placement or layout)
- Always a drawer on mobile view

## Notes

- Phase 2 of 3 for the dashboard UI layout.
- Use mock data from `src/lib/mock-data.ts` (import directly until DB is implemented).
- Reference screenshot: `context/screenshots/dashboard-ui-main.jpeg`.
- Related specs: `context/features/dashboard-phase-1-spec.md`, `context/features/dashboard-phase-3-spec.md`.

## History

<!-- Keep this updated, earliest to latest. -->

- **2026-05-24** — Initial project setup with Next.js 16.2.6, React 19.2.4, Tailwind CSS v4, and TypeScript 5 (Completed)
- **2026-05-27** — Added dashboard UI reference screenshots and mock data file (`src/lib/mock-data.ts`) covering user, item types, collections, and items for the dashboard UI (Completed)
- **2026-05-27** — Dashboard UI Phase 1: ShadCN setup, `/dashboard` route, base layout with dark mode, display-only top bar, sidebar/main placeholders (Completed)
- **2026-05-28** — Dashboard UI Phase 2: Collapsible sidebar with item types, favorite/recent collections, user avatar area; sidebar toggle moved to top bar for persistent visibility; collections section hidden in icon-collapsed state (Completed)
