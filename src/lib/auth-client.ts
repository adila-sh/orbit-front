import { adminClient, inferAdditionalFields, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/lib/env";

/**
 * Campos que o Identity da adila.co adiciona ao usuário além dos padrões do
 * Better Auth (name, email, image). Espelham a config do backend
 * (`identity/back/src/libs/auth/index.ts`) para que `useSession()` os retorne
 * tipados. Mantenha em sincronia se o servidor mudar os `additionalFields`.
 */
const identityUserFields = {
  language: { type: "string", required: false },
  timezone: { type: "string", required: false },
  preferences: { type: "json", required: false },
} as const;

/**
 * Cliente Better Auth do front, apontando para o Identity (`VITE_API_URL`).
 * Fala com o serviço sob `/api/auth/*`; os cookies de sessão viajam junto
 * (`credentials: include`, padrão do Better Auth). Os plugins acompanham os do
 * servidor — organização (com teams), admin e os campos extras do usuário.
 */
export const authClient = createAuthClient({
  baseURL: env.VITE_AUTH_URL,
  plugins: [
    organizationClient({ teams: { enabled: true } }),
    adminClient(),
    inferAdditionalFields({ user: identityUserFields }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
