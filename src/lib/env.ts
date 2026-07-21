import { z } from "zod";

/**
 * Client-side environment, validated at boot. Only `VITE_`-prefixed vars are
 * exposed to the browser by Vite — never put secrets here.
 */
const envSchema = z.object({
  VITE_API_URL: z.url().default("http://localhost:3000"),
});

export const env = envSchema.parse(import.meta.env);

export type Env = z.infer<typeof envSchema>;
