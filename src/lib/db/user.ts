import "server-only";

import { prisma } from "@/lib/prisma";

// Demo user until auth is wired up. Matches the seeded user id.
const DEMO_USER_ID = "user_1";

export interface SidebarUser {
  name: string;
  email: string;
  image: string | null;
}

export async function getCurrentUser({
  userId = DEMO_USER_ID,
}: {
  userId?: string;
} = {}): Promise<SidebarUser | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, image: true },
  });

  if (!user) return null;

  return {
    name: user.name ?? "Unknown",
    email: user.email ?? "",
    image: user.image,
  };
}
