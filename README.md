# template-front

Ponto de partida front-end da **adila.co**: uma SPA React (Vite) com o design
system adila.co e cache de servidor já conectados. Clone, aponte para o backend
e comece a construir. Sem SSR — o build gera estáticos servidos por qualquer
static host.

## Stack

| Camada | Ferramenta |
| --- | --- |
| Build / dev | [Vite](https://vite.dev/) |
| UI | [React](https://react.dev/) 19 |
| Roteamento | [TanStack Router](https://tanstack.com/router) (file-based) |
| Server state | [TanStack Query](https://tanstack.com/query) |
| Tabelas | [TanStack Table](https://tanstack.com/table) (headless) |
| Client state | [Zustand](https://zustand.docs.pmnd.rs/) |
| HTTP | [Better Fetch](https://better-fetch.vercel.app/) |
| Design system | [adila.co UI](https://ds.adila.co/docs) (registry shadcn sobre [Base UI](https://base-ui.com/)) |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com/) (tokens OKLCH, light + dark) |
| Linguagem | TypeScript |
| Runtime / gerenciador | [Bun](https://bun.sh/) |
| Lint / format | [oxlint](https://oxc.rs/) · [oxfmt](https://oxc.rs/) |
| Typecheck | `tsgo` ([@typescript/native-preview](https://github.com/microsoft/typescript-go)) |
| Git hooks | [lefthook](https://lefthook.dev/) |

## Começando

Pré-requisitos: [Bun](https://bun.sh/) 1.3+.

```bash
bun install            # instala deps e os git hooks (lefthook)
cp .env.example .env   # ajuste VITE_API_URL para o seu backend
bun run dev            # http://localhost:3000
```

Sem um backend rodando, o card de status mostra o estado **offline** de
propósito — é a demonstração do tratamento de erro de Query + Better Fetch.
Suba o [template-back](https://github.com/adila-sh/template-back) em
`http://localhost:3000` (ou aponte `VITE_API_URL` para outra URL) para ver
"Conectado".

## Scripts

| Comando | O que faz |
| --- | --- |
| `bun run dev` | Dev server com HMR |
| `bun run build` | Build de produção (SPA estático em `dist/`) |
| `bun run preview` | Pré-visualiza o build localmente (porta 4173) |
| `bun run typecheck` | `tsgo --noEmit` |
| `bun run lint` / `lint:fix` | oxlint |
| `bun run format` / `format:check` | oxfmt |
| `bun run test` | Vitest |
| `bun run generate-routes` | Regenera `src/routeTree.gen.ts` |

O pre-commit (lefthook) roda **lint + format:check + typecheck** em paralelo.

## Estrutura

```text
src/
├── main.tsx                # Client entry: monta RouterProvider + QueryClientProvider
├── routes/                 # Rotas file-based (TanStack Router)
│   ├── __root.tsx          # Root: ThemeProvider + Toaster + HeadContent
│   ├── _marketing.tsx      # Layout público (site-header + site-footer)
│   ├── _marketing.index.tsx    # / — landing
│   ├── _marketing.terms.tsx    # /terms — termos de uso
│   ├── _marketing.privacy.tsx  # /privacy — política de privacidade
│   ├── auth.tsx            # /auth — login/cadastro (standalone)
│   ├── _app.tsx            # Layout autenticado (sidebar + topbar/drawer)
│   ├── _app.dashboard.tsx  # /dashboard — stats, atividade, status
│   ├── _app.members.tsx    # /members — exemplo de TanStack Table
│   ├── _app.profile.tsx    # /profile — perfil
│   └── _app.settings.tsx   # /settings — preferências
├── features/               # Código por domínio
│   ├── status/             # api.ts · queries.ts · status-card.tsx
│   ├── members/            # mock.ts · columns.tsx — exemplo de tabela
│   └── account/            # mock.ts — usuário atual (mock)
├── components/
│   ├── ui/                 # Primitivos adila.co (Base UI) — gerados pelo DS
│   │                       #   + data-table.tsx (TanStack Table genérica)
│   ├── app/                # App shell: sidebar, topbar, user-menu, nav
│   ├── legal-page.tsx      # Casca das páginas legais (prose)
│   ├── site-header.tsx     # Header do marketing
│   ├── site-footer.tsx     # Footer do marketing
│   ├── theme-provider.tsx  # next-themes
│   └── mode-toggle.tsx
├── stores/                 # Stores Zustand
├── lib/                    # api.ts (Better Fetch) · env.ts (zod) · utils.ts
├── integrations/           # queryClient único (root-provider)
├── router.tsx              # createRouter (contexto com queryClient)
└── styles.css              # Tailwind v4 + tokens do tema adila.co
```

O `index.html` na raiz é o entry do Vite: carrega `src/main.tsx` e aplica o
tema antes do primeiro paint (evita flash sem SSR).

As rotas seguem o padrão flat do TanStack Router: prefixos `_marketing`/`_app`
são _layouts_ sem segmento de URL (renderizam `<Outlet/>`), e cada
`<layout>.<pagina>.tsx` vira uma rota filha.

## Padrões

- **Server state** vive no TanStack Query. Defina queries com `queryOptions`
  (`features/<x>/queries.ts`) e compartilhe entre loaders (prefetch via
  `context.queryClient`) e componentes (`useQuery`).
- **Tabelas** usam TanStack Table (headless). A `DataTable` genérica
  (`components/ui/data-table.tsx`) recebe `columns` + `data`; veja o exemplo em
  `features/members/` e na rota `/members`.
- **Client state** vai para Zustand.
- **HTTP** via Better Fetch: tuple `{ data, error }` com `throw: false`.
  Trate `error` — não lance direto na UI.
- **Env** validado por zod (`lib/env.ts`). Só `VITE_*` vai ao cliente.

## Design system

Adicione componentes adila.co com o CLI do shadcn apontando para o registry:

```bash
bunx shadcn@latest add https://ds.adila.co/r/button.json
```

Os componentes usam **Base UI** (não Radix): a composição é feita pela prop
`render`, não `asChild`. O tema (tokens OKLCH, primário verde, light + dark)
está em `src/styles.css`.

As fontes da marca são as famílias **Adila**, servidas do R2 da Cloudflare via
`@import "https://assets.adila.co/adila-fonts.css"` no topo de `src/styles.css`:
**Adila Std** (`--font-sans`), **Adila Code** (`--font-mono`), além de **Adila
Code Proportional** e **Adila Pixel** (variável, eixo `ELSH` 0..100 via
`font-variation-settings: "ELSH" <n>`). O `index.html` faz `preconnect` para
`assets.adila.co` e precarrega o peso Book (400) da Adila Std. Não há woff2
locais em `public/`.

## Deploy

`bun run build` gera um SPA estático em `dist/`, que pode ser servido por
qualquer static host (Netlify, Vercel, Cloudflare, S3+CDN…) — basta apontar o
fallback de rotas para `index.html`. Configurado para
[Railway](https://railway.app/) via `railway.json` (builder **Railpack**): o
Railpack detecta o Vite, builda com Bun e serve o `dist/` via Caddy já com o
fallback SPA nativo — sem servidor Node nem configuração extra. A CI (GitHub
Actions) roda typecheck, lint, format:check, testes e build a cada push/PR.

## Licença

[MIT](./LICENSE)
