import { Link, useRouterState } from "@tanstack/react-router";
import type { ComponentProps } from "react";

import { APP_NAV } from "@/components/app/nav";
import { UserMenu } from "@/components/app/user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

/** App-shell sidebar (padrão sidebar-07): colapsa para ícones no desktop. */
export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center gap-2 group-data-[collapsible=icon]:justify-center">
        <SidebarMenuButton
          size="lg"
          render={<Link to="/dashboard" />}
          className="flex-1 group-data-[collapsible=icon]:hidden"
        >
          <span className="grid aspect-square size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            a
          </span>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">template-front</span>
            <span className="truncate text-xs text-muted-foreground">adila.co</span>
          </div>
        </SidebarMenuButton>
        <SidebarTrigger className="shrink-0" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu>
            {APP_NAV.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={pathname.startsWith(item.to)}
                  render={<Link to={item.to} />}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
