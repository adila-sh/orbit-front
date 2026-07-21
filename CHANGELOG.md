# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Vitest + Testing Library configurados, com testes de exemplo (util, store e
  componente) e helper `renderWithProviders`.
- Padrão de mutations do TanStack Query na feature `members`: convite (invalida o
  cache) e remoção otimista (com rollback).
- Formulário validado com React Hook Form + Zod no diálogo de convite.
- Boundaries de rota globais: erro, 404 e loading (`defaultErrorComponent`,
  `defaultNotFoundComponent`, `defaultPendingComponent`).
- Templates de PR e de issues (bug / feature) no `.github`.

## [0.1.0]

### Added

- Estrutura inicial do template: Vite + React SPA, TanStack Router/Query/Table,
  Zustand, Better Fetch, adila.co UI, oxlint, oxfmt, tsgo e CI.
