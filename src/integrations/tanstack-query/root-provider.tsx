import { QueryClient } from "@tanstack/react-query";

/**
 * Instância única do QueryClient, compartilhada entre o `QueryClientProvider`
 * (em `main.tsx`) e o contexto do router — assim os loaders (`prefetchQuery`) e
 * os componentes (`useQuery`) usam o mesmo cache.
 */
export const queryClient = new QueryClient();

export function getContext() {
  return { queryClient };
}
