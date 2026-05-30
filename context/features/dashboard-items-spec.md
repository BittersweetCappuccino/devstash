# Dashboard Items Spec

## Overview

Replace the dummy item data (including 'Pinned' and 'Recent' items) displayed in the main area of the dashboard (right side), with actual data from the database. So, instead of using data from @src/lib/mock-data.ts, fetch the data from our Neon database with Prisma. The layout should not change. 

If there are no pinned items, the section should not appear there.

## Requirements

- Create src/lib/db/items.ts with data fetching functions
- Fetch items directly in server component
- Update collection stats display accordingly.

## References

- The layout and design are already in place; the `@context/screenshots/dashboard-ui-main.jpeg` screenshot is available for reference, if needed.
- Item card icon and border derived from the item type (preserve existing logic and appearance)
- Display item type tags, title and description (preserve existing logic and appearance)
- Display the favorite icon on card, when true (preserve existing logic and appearance).
