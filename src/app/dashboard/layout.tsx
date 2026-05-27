import { PanelLeft } from "lucide-react";

import { Logo } from "@/components/dashboard/logo";
import { TopBar } from "@/components/dashboard/top-bar";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="flex h-14 items-center justify-between gap-2 border-b border-border px-4">
          <Logo />
          <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
            <PanelLeft />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Sidebar</h2>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
