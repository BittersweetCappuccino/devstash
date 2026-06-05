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

import type { ItemTypeMeta } from "@/lib/db/items";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function TypeIcon({
  type,
  className,
  style,
}: {
  type: ItemTypeMeta | undefined;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!type) return null;
  const Icon = ICON_MAP[type.icon];
  if (!Icon) return null;
  return <Icon className={className} style={{ color: type.color, ...style }} />;
}
