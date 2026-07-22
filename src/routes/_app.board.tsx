import { createFileRoute } from "@tanstack/react-router";

import { KanbanBoard } from "@/features/issues/kanban-board";

export const Route = createFileRoute("/_app/board")({
  head: () => ({ meta: [{ title: "Quadro · Adila Orbit" }] }),
  component: Board,
});

function Board() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Quadro</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Arraste issues entre as colunas para atualizar o status.
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}
