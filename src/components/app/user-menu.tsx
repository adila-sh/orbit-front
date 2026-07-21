import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronsUpDownIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { initials } from "@/features/account/mock";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

/** User dropdown docked in the sidebar footer (sidebar-07 `NavUser`). */
export function UserMenu() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  // A app-shell só renderiza com sessão (guard em `_app.tsx`), mas mantemos
  // fallbacks para o intervalo até o primeiro fetch resolver.
  const name = session?.user.name ?? "—";
  const email = session?.user.email ?? "";

  async function handleSignOut() {
    await signOut();
    toast.success("Sessão encerrada");
    void navigate({ to: "/auth" });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-medium text-primary">
                    {initials(name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs text-muted-foreground">{email}</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs font-normal text-muted-foreground">{email}</span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link to="/profile" />}>
                <UserIcon />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link to="/settings" />}>
                <SettingsIcon />
                Configurações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SunIcon className="dark:hidden" />
                <MoonIcon className="hidden dark:block" />
                Tema
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Escuro</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => void handleSignOut()}>
              <LogOutIcon />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
