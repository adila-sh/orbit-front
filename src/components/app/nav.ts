import {
  KanbanSquareIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  MapIcon,
  SettingsIcon,
  UsersIcon,
  FolderKanbanIcon,
  type LucideIcon,
} from "lucide-react";

import type { FileRoutesByTo } from "@/routeTree.gen";

export interface AppNavItem {
  to: keyof FileRoutesByTo;
  label: string;
  icon: LucideIcon;
}

/** Primary navigation of the authenticated app shell. */
export const APP_NAV: readonly AppNavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/projects", label: "Projects", icon: FolderKanbanIcon },
  { to: "/issues", label: "My Issues", icon: ListTodoIcon },
  { to: "/backlog", label: "Backlog", icon: ListTodoIcon },
  { to: "/board", label: "Boards", icon: KanbanSquareIcon },
  { to: "/roadmap", label: "Roadmap", icon: MapIcon },
  { to: "/members", label: "Membros", icon: UsersIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];
