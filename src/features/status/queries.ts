import { queryOptions } from "@tanstack/react-query";

import { fetchBackendStatus } from "@/features/status/api";

/**
 * Reusable query definition. Share it between route loaders (prefetch on the
 * server) and components (`useQuery`) so the cache key stays in one place.
 */
export const statusQueryOptions = queryOptions({
  queryKey: ["backend-status"],
  queryFn: fetchBackendStatus,
  staleTime: 10_000,
  retry: false,
});
