import { LayoutDashboardIcon, UsersIcon, type LucideIcon } from "lucide-react";

import type { FileRoutesByTo } from "@/routeTree.gen";

export interface AppNavItem {
  to: keyof FileRoutesByTo;
  label: string;
  icon: LucideIcon;
}

/** Primary navigation of the authenticated app shell. */
export const APP_NAV: readonly AppNavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/members", label: "Membros", icon: UsersIcon },
];
