import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { CommandPalette } from "@/components/app/command-palette";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  issues: "My Issues",
  backlog: "Backlog",
  board: "Boards",
  roadmap: "Roadmap",
  members: "Membros",
  settings: "Settings",
  profile: "Perfil",
};

export function AppTopbar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "dashboard";
  const label = LABELS[segment] ?? "Orbit";

  return (
    <header className="flex h-12 items-center gap-3 border-b px-4 sm:px-6 lg:px-8">
      <SidebarTrigger className="shrink-0" />
      <span className="text-sm text-muted-foreground">Orbit</span>
      <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
      <Link
        to={pathname === "/dashboard" ? "/dashboard" : (pathname as "/dashboard")}
        className="text-sm font-medium hover:underline"
      >
        {label}
      </Link>
      <div className="ml-auto">
        <CommandPalette />
      </div>
    </header>
  );
}
