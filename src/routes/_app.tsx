import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { AppSidebar } from "@/components/app/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useAppStore } from "@/stores/app-store";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  // Guard de autenticação: sem sessão, manda para o login. O backend (Identity)
  // é a fonte da verdade — isto só evita renderizar a app-shell para quem não
  // entrou. Endpoints protegidos continuam validando a sessão no servidor.
  useEffect(() => {
    if (!isPending && !session) void navigate({ to: "/auth" });
  }, [isPending, session, navigate]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* No desktop o toggle vive dentro da sidebar; no mobile abre o Sheet. */}
          <SidebarTrigger className="mb-4 md:hidden" />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
