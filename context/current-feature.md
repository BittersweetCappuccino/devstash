# Current Feature

Seed Data Expansion — extend `prisma/seed.ts` with new collections, items, and an updated demo user per the seed-spec.

## Status

Completed (pending review & merge)

## Goals

- Update the existing seed user to match the new spec:
  - **Email:** danielaEM@example.com
  - **Name:** Demo User
  - **Password:** IsNotEasy67 (hash with bcryptjs, 12 rounds)
  - **isPro:** false
  - **emailVerified:** current date
- Add the following collections (and their items) to the existing seed script, in addition to whatever is already there:
  - **React Patterns** — _Reusable React patterns and hooks_
    - 3 TypeScript snippets: custom hooks (useDebounce, useLocalStorage, etc.), component patterns (Context providers, compound components), utility functions
  - **AI Workflows** — _AI prompts and workflow automations_
    - 3 prompts: code review, documentation generation, refactoring assistance
  - **DevOps** — _Infrastructure and deployment resources_
    - 1 snippet (Docker, CI/CD config)
    - 1 command (deployment scripts)
    - 2 links (real documentation URLs)
  - **Terminal Commands** — _Useful shell commands for everyday development_
    - 4 commands: git operations, Docker commands, process management, package manager utilities
  - **Design Resources** — _UI/UX resources and references_
    - 4 links (real URLs): CSS/Tailwind references, component libraries, design systems, icon libraries

## Notes

- Full spec lives in [context/features/seed-spec.md](context/features/seed-spec.md).
- Only add what is new — do not duplicate or remove existing seed data unless updating the demo user.
- Use real URLs for `link` items where the spec calls for them.
- Each collection should set a sensible `defaultTypeId` matching its dominant item type.
- Re-run the seed script after changes to verify it succeeds against the dev database.

## History

- **2026-05-24** — Initial project setup with Next.js 16.2.6, React 19.2.4, Tailwind CSS v4, and TypeScript 5 (Completed)
- **2026-05-27** — Added dashboard UI reference screenshots and mock data file (`src/lib/mock-data.ts`) covering user, item types, collections, and items for the dashboard UI (Completed)
- **2026-05-27** — Dashboard UI Phase 1: ShadCN setup, `/dashboard` route, base layout with dark mode, display-only top bar, sidebar/main placeholders (Completed)
- **2026-05-28** — Dashboard UI Phase 2: Collapsible sidebar with item types, favorite/recent collections, user avatar area; sidebar toggle moved to top bar for persistent visibility; collections section hidden in icon-collapsed state (Completed)
- **2026-05-28** — Dashboard UI Phase 3: Main area with 4 stats cards, collections grid (color-coded by default type), pinned items, and 10 most recent items (Completed)
- **2026-05-29** — Database Setup: Prisma 7 + Neon PostgreSQL with initial schema, NextAuth v5 models, `prisma.config.ts`, `PrismaPg` driver adapter singleton, seed script, and `20260529025256_init` migration applied to dev branch (Completed)
- **2026-05-29** — Seed Data Expansion: added `hashedPassword` field to `User` (migration `20260529170631_add_user_hashed_password`), installed `bcryptjs`, updated demo user (Demo User / danielaEM@example.com / bcrypt 12 rounds / isPro=false / emailVerified=now), and added 4 collections (AI Workflows, DevOps, Terminal Commands, Design Resources) plus 3 new React Patterns snippets — 18 new items total. Seed and build verified (Completed)
