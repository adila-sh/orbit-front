import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import type { QueryClient } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { title: "template-front · adila.co" },
      {
        name: "description",
        content:
          "Template front-end da adila.co — Vite, React, TanStack Router, TanStack Query, TanStack Table, Zustand e Better Fetch.",
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <ThemeProvider>
      {/* React 19 iça title/meta renderizados por HeadContent para o <head>. */}
      <HeadContent />
      <Outlet />
      <Toaster richColors position="bottom-right" />
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{ position: "bottom-left" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      )}
    </ThemeProvider>
  );
}
