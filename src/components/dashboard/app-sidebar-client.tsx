"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Code,
  File as FileIcon,
  Folder,
  Image as ImageIcon,
  Layers,
  Link as LinkIcon,
  Settings,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { SidebarCollection } from "@/lib/db/collections";
import type { SidebarItemType } from "@/lib/db/items";
import type { SidebarUser } from "@/lib/db/user";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function AppSidebarClient({
  itemTypes,
  collections,
  user,
}: {
  itemTypes: SidebarItemType[];
  collections: SidebarCollection[];
  user: SidebarUser | null;
}) {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const otherCollections = collections.filter((c) => !c.isFavorite);

  const userInitials =
    (user?.name ?? "")
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 flex-row items-center justify-between gap-2 border-b border-sidebar-border px-3 py-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <div className="flex min-w-0 items-center gap-2.5 group-data-[collapsible=icon]:hidden">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-violet-500 text-white">
            <Layers className="size-5" />
          </div>
          <span className="truncate text-base font-semibold tracking-tight">
            DevStash
          </span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <TypesGroup
          open={typesOpen}
          onOpenChange={setTypesOpen}
          itemTypes={itemTypes}
        />
        <CollectionsGroup
          open={collectionsOpen}
          onOpenChange={setCollectionsOpen}
          favorites={favoriteCollections}
          other={otherCollections}
        />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Avatar size="sm">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name} />
            ) : null}
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium">
              {user?.name ?? "Unknown"}
            </span>
            <span className="truncate text-xs text-sidebar-foreground/60">
              {user?.email ?? ""}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Settings"
            className="group-data-[collapsible=icon]:hidden"
          >
            <Settings />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function SectionHeader({
  label,
  open,
}: {
  label: string;
  open: boolean;
}) {
  return (
    <CollapsibleTrigger
      className={cn(
        "flex h-7 w-full items-center gap-1 rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none transition-colors",
        "hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "group-data-[collapsible=icon]:hidden"
      )}
    >
      <span>{label}</span>
      <ChevronDown
        className={cn(
          "size-3 transition-transform duration-200",
          !open && "-rotate-90"
        )}
      />
    </CollapsibleTrigger>
  );
}

function TypesGroup({
  open,
  onOpenChange,
  itemTypes,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemTypes: SidebarItemType[];
}) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SidebarGroup>
        <SectionHeader label="Types" open={open} />
        <CollapsibleContent>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              {itemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon];
                const label = `${type.name}s`;
                return (
                  <SidebarMenuItem key={type.id}>
                    <SidebarMenuButton
                      render={<Link href={type.route} />}
                      tooltip={label}
                    >
                      {Icon ? (
                        <Icon style={{ color: type.color }} />
                      ) : (
                        <span className="size-4" />
                      )}
                      <span>{label}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function CollectionsGroup({
  open,
  onOpenChange,
  favorites,
  other,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favorites: SidebarCollection[];
  other: SidebarCollection[];
}) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SectionHeader label="Collections" open={open} />
        <CollapsibleContent className="space-y-2">
          {favorites.length > 0 ? (
            <SidebarGroupContent className="mt-1">
              <SubheaderLabel>Favorites</SubheaderLabel>
              <SidebarMenu>
                {favorites.map((col) => (
                  <SidebarMenuItem key={col.id}>
                    <SidebarMenuButton tooltip={col.name}>
                      <Folder />
                      <span>{col.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : null}

          {other.length > 0 ? (
            <SidebarGroupContent>
              <SubheaderLabel>All Collections</SubheaderLabel>
              <SidebarMenu>
                {other.map((col) => (
                  <SidebarMenuItem key={col.id}>
                    <SidebarMenuButton tooltip={col.name}>
                      <Folder />
                      <span>{col.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{col.itemCount}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : null}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function SubheaderLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pt-1 pb-1 text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
      {children}
    </div>
  );
}
