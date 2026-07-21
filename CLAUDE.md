# template-front

Template front-end da adila.co: SPA em Vite + React + adila.co UI + TanStack Router +
TanStack Query + TanStack Table + Zustand + Better Fetch, sobre Tailwind v4. Sem SSR —
o build gera estáticos servidos por qualquer static host. Use **Bun** como runtime e
gerenciador de pacotes.

## Comandos

- `bun install` — instala deps (roda `lefthook install` via `prepare`)
- `bun run dev` — dev server em http://localhost:3000
- `bun run build` — build de produção (SPA estático em `dist/`)
- `bun run preview` — pré-visualiza o build localmente (Vite, porta 4173)
- `bun run typecheck` — `tsgo --noEmit`
- `bun run lint` / `bun run lint:fix` — oxlint
- `bun run format` / `bun run format:check` — oxfmt
- `bun run test` — vitest
- `bunx shadcn@latest add https://ds.adila.co/r/<item>.json` — adiciona componente do DS

O pre-commit (lefthook) roda lint + format:check + typecheck.

## Arquitetura

- **Entry:** `index.html` (raiz) carrega `src/main.tsx`, que monta o
  `RouterProvider` dentro do `QueryClientProvider`. O router é criado em
  `src/router.tsx` (`createRouter`).
- **Roteamento:** TanStack Router baseado em arquivos em `src/routes/`.
  `src/routeTree.gen.ts` é gerado pelo plugin do Vite — não edite à mão.
- **Server state:** TanStack Query. Defina queries com `queryOptions` em
  `src/features/<x>/queries.ts` e compartilhe entre loaders (prefetch via
  `context.queryClient`) e componentes (`useQuery`). O `queryClient` é uma
  instância única em `src/integrations/tanstack-query/root-provider.ts`,
  compartilhada entre o provider e o contexto do router.
- **Tabelas:** TanStack Table (headless). `DataTable` genérica em
  `src/components/ui/data-table.tsx`; exemplo em `src/routes/_app.members.tsx`.
- **Client state:** Zustand em `src/stores/`.
- **HTTP:** Better Fetch (`src/lib/api.ts`), tuple `{ data, error }` com
  `throw: false`. Nunca lance direto na UI — trate `error`.
- **Env:** validado por zod em `src/lib/env.ts`. Só variáveis com prefixo
  `VITE_` chegam ao bundle do cliente — trate-as como públicas.
- **Design system:** adila.co UI (registry shadcn sobre **Base UI**, não Radix).
  Composição usa a prop `render`, não `asChild`. Tema em `src/styles.css`
  (tokens OKLCH, `@theme inline`, light + dark).
- **Fontes:** famílias de marca Adila servidas do R2 da Cloudflare via
  `@import "https://assets.adila.co/adila-fonts.css"` no topo de `src/styles.css`.
  `Adila Std` (`--font-sans`), `Adila Code` (`--font-mono`), além de
  `Adila Code Proportional` e `Adila Pixel` (variável, eixo `ELSH` 0..100 via
  `font-variation-settings: "ELSH" <n>`). `index.html` faz `preconnect` +
  `preload` do peso Book. Não hospede woff2 em `public/`.

## Convenções

- Alias de import: `@/*` → `src/*`. Organize por feature em `src/features/`.
- Imutabilidade: nunca mute estado; retorne cópias novas.
- Componentes em PascalCase; hooks com prefixo `use`; props tipadas.
- Animações: apenas propriedades compositor-friendly (`transform`, `opacity`).
