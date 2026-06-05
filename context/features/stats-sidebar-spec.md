# Stats & Sidebar Spec

## Overview

The stats in the main area should display the data from the actual database instead of the @src/lib/mock-data.ts file. 

The sidebar should not display static or mock data, but the actual collection data, favorites and system item types from the database.

## Requirements

- Display stats pertaining to database data, keeping the current design/layout
- Keep showing the item types in sidebar with their icons, linking to /items/[typename]
- Keep the star icons for favorite collections
- The items in the sidebar should be arranged alphabetically, for each dedicated section.
- Create @src/lib/db/items.ts and add the database functions. Use the collections file for reference if needed.


## References

-  @src/lib/db/collections.ts
