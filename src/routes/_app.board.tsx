import { createFileRoute } from "@tanstack/react-router";
import { KanbanSquareIcon } from "lucide-react";

import { KanbanBoard } from "@/features/issues/kanban-board";

export const Route = createFileRoute("/_app/board")({
  head: () => ({ meta: [{ title: "Boards · Adila Orbit" }] }),
  component: Board,
});

function Board() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <KanbanSquareIcon className="size-5" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Boards</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Arraste issues entre as colunas para atualizar o status.
          </p>
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}
