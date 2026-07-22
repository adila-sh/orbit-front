import {
  KanbanSquareIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  MapIcon,
  SettingsIcon,
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
  { to: "/dashboard", label: "Painel", icon: LayoutDashboardIcon },
  { to: "/projects", label: "Projetos", icon: FolderKanbanIcon },
  { to: "/issues", label: "Minhas issues", icon: ListTodoIcon },
  { to: "/backlog", label: "Backlog", icon: ListTodoIcon },
  { to: "/board", label: "Quadro", icon: KanbanSquareIcon },
  { to: "/roadmap", label: "Roadmap", icon: MapIcon },
  { to: "/settings", label: "Configurações", icon: SettingsIcon },
];
