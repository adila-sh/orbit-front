import { createFileRoute } from "@tanstack/react-router";
import { ListTodoIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/app/placeholder-page";

export const Route = createFileRoute("/_app/backlog")({
  component: () => (
    <PlaceholderPage
      icon={ListTodoIcon}
      title="Backlog"
      description="O backlog do projeto será conectado na próxima fatia."
    />
  ),
});
