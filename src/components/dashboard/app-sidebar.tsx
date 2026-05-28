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
import {
  collections,
  currentUser,
  items,
  itemTypes,
  type Collection,
  type ItemType,
} from "@/lib/mock-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function AppSidebar() {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const itemCountByType = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.itemTypeId] = (acc[item.itemTypeId] ?? 0) + 1;
    return acc;
  }, {});

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections
    .filter((c) => !c.isFavorite)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const userInitials =
    currentUser.name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 flex-row items-center gap-2 border-b border-sidebar-border px-3 py-0 group-data-[collapsible=icon]:px-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-violet-500 text-white">
            <Layers className="size-5" />
          </div>
          <span className="truncate text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            DevStash
          </span>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <TypesGroup
          open={typesOpen}
          onOpenChange={setTypesOpen}
          itemTypes={itemTypes}
          countByType={itemCountByType}
        />
        <CollectionsGroup
          open={collectionsOpen}
          onOpenChange={setCollectionsOpen}
          favorites={favoriteCollections}
          recent={recentCollections}
        />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Avatar size="sm">
            {currentUser.image ? (
              <AvatarImage src={currentUser.image} alt={currentUser.name} />
            ) : null}
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium">
              {currentUser.name}
            </span>
            <span className="truncate text-xs text-sidebar-foreground/60">
              {currentUser.email}
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
  countByType,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemTypes: ItemType[];
  countByType: Record<string, number>;
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
                const count = countByType[type.id] ?? 0;
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
                    <SidebarMenuBadge>{count}</SidebarMenuBadge>
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
  recent,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favorites: Collection[];
  recent: Collection[];
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

          {recent.length > 0 ? (
            <SidebarGroupContent>
              <SubheaderLabel>All Collections</SubheaderLabel>
              <SidebarMenu>
                {recent.map((col) => (
                  <SidebarMenuItem key={col.id}>
                    <SidebarMenuButton tooltip={col.name}>
                      <Folder />
                      <span>{col.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{col.itemIds.length}</SidebarMenuBadge>
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
