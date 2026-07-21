import { apiClient } from "@/lib/api";
import { env } from "@/lib/env";

export interface BackendStatus {
  reachable: boolean;
  status?: string;
  url: string;
}

/**
 * Pings the configured backend (`VITE_API_URL`) to prove the Better Fetch +
 * TanStack Query wiring end-to-end. Any 2xx counts as reachable; anything else
 * (offline, CORS, non-2xx) resolves as `reachable: false` so the UI can render
 * an honest offline state instead of crashing.
 */
export async function fetchBackendStatus(): Promise<BackendStatus> {
  const url = env.VITE_API_URL;
  const { data, error } = await apiClient<{ status?: string }>("/", {
    method: "GET",
  });

  if (error) {
    return { reachable: false, url };
  }

  return { reachable: true, status: data?.status ?? "ok", url };
}
