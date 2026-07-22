import { createFetch } from "@better-fetch/fetch";

import { env } from "@/lib/env";
import { clearIdentityToken, getIdentityToken } from "@/lib/identity-token";

/**
 * Shared HTTP client (Better Fetch). Points at the backend template
 * (`template-back`) by default — override with `VITE_API_URL`.
 *
 * `throw: false` returns a `{ data, error }` tuple instead of throwing, which
 * pairs cleanly with TanStack Query's error handling. Pass `throw: true` on a
 * per-call basis when you want the promise to reject.
 */
export const apiClient = createFetch({
  baseURL: env.VITE_API_URL,
  credentials: "include",
  throw: false,
  onRequest: async (context) => {
    const token = await getIdentityToken();
    if (token) context.headers.set("Authorization", `Bearer ${token}`);
    return context;
  },
  onResponse: async (context) => {
    if (context.response.status === 401) clearIdentityToken();
    return context;
  },
});
