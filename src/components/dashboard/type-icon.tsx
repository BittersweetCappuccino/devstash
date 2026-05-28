import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { itemTypes, type ItemType } from "@/lib/mock-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function getItemType(typeId: string): ItemType | undefined {
  return itemTypes.find((t) => t.id === typeId);
}

export function TypeIcon({
  typeId,
  className,
  style,
}: {
  typeId: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const type = getItemType(typeId);
  if (!type) return null;
  const Icon = ICON_MAP[type.icon];
  if (!Icon) return null;
  return <Icon className={className} style={{ color: type.color, ...style }} />;
}
