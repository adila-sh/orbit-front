import { createFileRoute } from "@tanstack/react-router";
import { KanbanSquareIcon, MapIcon, Table2Icon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MilestoneTimeline } from "@/features/milestones/milestone-timeline";
import { KanbanBoard } from "@/features/issues/kanban-board";
import { IssueTableView } from "@/features/issues/issue-table-view";
import { useAppStore } from "@/stores/app-store";

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
          Escolha a visualização que melhor representa o trabalho do seu time.
        </p>
      </div>
      <Tabs
        value={useAppStore((state) => state.boardView)}
        onValueChange={(value) =>
          useAppStore.getState().setBoardView(value as "table" | "kanban" | "roadmap")
        }
      >
        <TabsList aria-label="Visualização do projeto">
          <TabsTrigger value="table">
            <Table2Icon />
            Tabela
          </TabsTrigger>
          <TabsTrigger value="kanban">
            <KanbanSquareIcon />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="roadmap">
            <MapIcon />
            Roadmap
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <IssueTableView />
        </TabsContent>
        <TabsContent value="kanban">
          <KanbanBoard />
        </TabsContent>
        <TabsContent value="roadmap">
          <MilestoneTimeline />
        </TabsContent>
      </Tabs>
    </div>
  );
}
