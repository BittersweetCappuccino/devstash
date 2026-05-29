# Dashboard Collections Spec

## Overview

Replace the dummy collection data displayed in the main area of the dashboard (right side), with actual data from the database. So, instead of using data from @src/lib/mock-data.ts, fetch the data from our Neon database with Prisma. The layout per-se should not change, except we should always display only the first 6 collection cards, in alphabetical order.

Do not modify the 'Pinned' and 'Recent' items yet. 

## Requirements

- Create src/lib/db/collections.ts with data fetching functions
- Fetch collections directly in server component
- Update collection stats display accordingly.

## References

- The layout and design are already in place; the `@context/screenshots/dashboard-ui-main.jpeg` screenshot is available for reference if needed.
- Collection card border color derived from most-used content type in that collection (preserve existing logic and appearance)
- Show small icons of all types in that collection (preserve existing logic and appearance)
