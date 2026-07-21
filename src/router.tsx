import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { getContext } from "./integrations/tanstack-query/root-provider";
import { NotFound } from "./components/not-found";
import { RouteError } from "./components/route-error";
import { Spinner } from "./components/ui/spinner";

export function createRouter() {
  const context = getContext();

  return createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    // Fallbacks globais — cada rota pode sobrescrever com suas próprias opções.
    defaultErrorComponent: RouteError,
    defaultNotFoundComponent: NotFound,
    defaultPendingComponent: () => (
      <div className="grid min-h-svh place-items-center">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    ),
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
