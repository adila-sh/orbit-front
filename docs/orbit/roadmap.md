# Adila Orbit — Roadmap do Frontend

**Data:** 2026-07-21
**Status:** Fatia 2 em andamento
**Escopo deste doc:** objetivos de **frontend** (`front/`). Objetivos de backend em
[`back/docs/orbit/roadmap.md`](../../../back/docs/orbit/roadmap.md).

## Visão

Interface de gestão de projetos que deve sentir-se mais próxima do **Linear** que do
Jira: minimalista, rápida, keyboard-first, espaçamento generoso, tipografia excelente,
animações sutis, **dark mode first**. Construída sobre o template `front/` (Vite +
React 19 + TanStack Router/Query/Table + Zustand + Better Fetch + Tailwind v4) usando o
**design system adila.co UI** (registry shadcn sobre Base UI — composição via `render`,
não `asChild`). Entregue em **fatias verticais**, integradas à API real antes de avançar.

## Princípios

- **Reuso do template** — não recriar `back/`/`front/`; estender rotas, features e o DS existentes.
- **Organização por feature** — `src/features/<x>/` com `queries.ts`/`mutations.ts`/`columns.tsx`/componentes.
- **Server state via TanStack Query** — `queryOptions` compartilhado entre loaders (prefetch) e componentes; nunca duplicar server state no Zustand.
- **HTTP via Better Fetch** — sempre tratar a tupla `{ data, error }`; nunca lançar direto na UI.
- **Imutabilidade + animações compositor-friendly** (`transform`/`opacity`).
- **Anti-template** — hierarquia por escala, ritmo intencional, estados hover/focus/active desenhados. Nada de card-grid genérico.

## Design system

adila.co UI já instalado (~25 componentes em `src/components/ui/`). Adicionar novos com
`bunx shadcn@latest add https://ds.adila.co/r/<item>.json`. **dnd-kit** entra à parte
(não faz parte do DS) para o board Kanban. Tema OKLCH em `src/styles.css` (light + dark),
fontes de marca Adila via R2.

## Navegação-alvo (sidebar)

Hoje: Dashboard, Membros. **Alvo:** Dashboard · Projects · My Issues · Backlog · Boards ·
Roadmap · Settings — mais seletor de **workspace** no topo da sidebar. Atualizar
`components/app/nav.ts` e o layout `_app.tsx`.

---

## Fatias

> Fatia 1 é **backend puro** (dados + API + seed) — sem trabalho de frontend.
> O frontend começa na Fatia 2, consumindo a API real.

### Fatia 2 — Shell do app + contexto de workspace  ·  `🟡 em andamento`

- [x] Seletor de workspace na sidebar (lista via plugin `organization`; troca a org ativa).
- [x] Atualizar `nav.ts`/`_app.tsx` com os itens: Dashboard, Projects, My Issues, Backlog, Boards, Roadmap, Settings.
- [ ] Sidebar redimensionável.
- [x] Top navigation + breadcrumb.
- [ ] `features/workspace/` — `queries.ts` (workspace atual, lista de projetos) + provider/contexto de workspace ativo.
- [x] Rotas TanStack Router base: `_app.projects`, `_app.issues` (My Issues), `_app.backlog`, `_app.board`, `_app.roadmap`, `_app.settings` (placeholders; Projects ligado à API).
- [x] `features/workspace/api.ts` conectado ao endpoint `/v1/projects` via `lib/api.ts`.
- [x] Estados: Loading Skeleton e Empty State consistentes na lista de Projects.

### Fatia 3 — Backlog + Issue Detail + Comentários  ·  `[ ] pendente`

- [ ] **Projects**: lista de projetos (cards com ícone/cor/status) + Project Overview.
- [ ] **Backlog**: lista (TanStack Table / `DataTable`) com filtros, ordenação, busca, quick-edit e bulk actions.
- [ ] **My Issues**: issues atribuídas ao usuário logado.
- [ ] **Issue Detail** (drawer à direita **e** página dedicada): título, descrição (markdown placeholder), status, priority, type, assignee, labels, milestone, dueDate, estimate.
- [ ] **Comentários** (markdown + menções placeholder) e **timeline de atividade/histórico**.
- [ ] `mutations.ts` com optimistic updates para status/assignee/priority.
- [ ] Componentes de UI: Badge de status/priority/type, Avatar de assignee, Empty/Skeleton.

### Fatia 4 — Board Kanban (DnD)  ·  `[ ] pendente`

- [ ] Board com **dnd-kit**: colunas por status, drag-and-drop reordenando + mudando status via `PATCH /issues/:id/move`.
- [ ] Optimistic reorder com rollback no erro (Better Fetch `error`).
- [ ] Filtros, busca e agrupamento (por assignee/priority) no board.
- [ ] Cartão de issue reutilizável entre board e listas.

### Fatia 5 — Dashboard  ·  `[ ] pendente`

- [ ] Cards de métricas: Total de Issues, Concluídas, Em Progresso, Atrasadas, placeholder de Velocity.
- [ ] Data viz tratada como parte do design system (ver skill `dataviz`), não afterthought.

### Fatia 6 — Command palette + atalhos  ·  `[ ] pendente`

- [ ] Command Palette (busca de issues/projetos/ações).
- [ ] Atalhos: `C` criar issue · `/` buscar · `G` depois `P` ir para Projects · `Esc` fechar diálogos.
- [ ] Hook `useKeyboardShortcuts` centralizado.

### Fatia 7 — Roadmap (timeline/milestones)  ·  `[ ] pendente`

- [ ] Timeline com milestones (implementação futura aceitável).
- [ ] Dependências entre issues (se confirmado no backend).

---

## Componentes-alvo (brief)

Já existem: Button, Card, Dialog, Sheet(Drawer), Dropdown, Tabs, Table, Avatar, Badge,
Tooltip, Skeleton, Input, Select, Switch, Checkbox, Textarea, Separator, Sidebar.
**A criar/estender:** Command Palette, Breadcrumb, Empty State, Search Input, Markdown
Editor (placeholder), cartão de issue, badges semânticos de status/priority/type.

## Páginas-alvo (brief)

Dashboard · Projects · Project Overview · Board · Issue Details · Settings · 404 (já existe).

## Arquitetura futura (preparar, não implementar)

AI assistant · integrações GitHub/GitLab · sprint planning · time tracking ·
notificações · WebSockets · activity feed · analytics · automation workflows.
