/**
 * Mock do usuário autenticado. Num app real, troque por dados vindos do
 * backend (TanStack Query) — o loader de `_app` seria o lugar do prefetch.
 */
export interface CurrentUser {
  name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
}

export const CURRENT_USER: CurrentUser = {
  name: "Ada Lovelace",
  username: "ada",
  email: "ada@adila.co",
  role: "Administradora",
  bio: "Primeira programadora da história. Construindo o futuro na adila.co.",
};

/** Iniciais para o fallback do avatar. */
export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}
