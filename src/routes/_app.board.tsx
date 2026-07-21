import { createFileRoute } from "@tanstack/react-router";
import { KanbanSquareIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/app/placeholder-page";

export const Route = createFileRoute("/_app/board")({
  component: () => (
    <PlaceholderPage
      icon={KanbanSquareIcon}
      title="Boards"
      description="O board Kanban será conectado na Fatia 4."
    />
  ),
});
