import { env } from "@/lib/env";

const TOKEN_URL = new URL("/api/auth/token", env.VITE_AUTH_URL).toString();
const EXPIRY_SKEW_MS = 30_000;
let cached: { token: string; expMs: number } | null = null;
let inflight: Promise<string | null> | null = null;

function decodeExpiryMs(token: string) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return 0;
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      exp?: number;
    };
    return typeof json.exp === "number" ? json.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

async function mintToken() {
  try {
    const response = await fetch(TOKEN_URL, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const token = ((await response.json()) as { token?: string }).token ?? null;
    cached = token ? { token, expMs: decodeExpiryMs(token) } : null;
    return token;
  } catch {
    cached = null;
    return null;
  }
}

export function getIdentityToken() {
  const now = Date.now();
  if (cached && cached.expMs - EXPIRY_SKEW_MS > now) return Promise.resolve(cached.token);
  if (inflight) return inflight;
  inflight = mintToken().finally(() => {
    inflight = null;
  });
  return inflight;
}

export function clearIdentityToken() {
  cached = null;
}
