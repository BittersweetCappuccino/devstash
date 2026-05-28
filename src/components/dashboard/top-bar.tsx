import { FolderPlus, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-background px-4">
      <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          className="h-9 pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm">
          <FolderPlus />
          New Collection
        </Button>
        <Button variant="outline" size="sm">
          <Plus />
          New Item
        </Button>
      </div>
    </header>
  );
}
