import { createFileRoute } from "@tanstack/react-router";
import { ListTodoIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/app/placeholder-page";

export const Route = createFileRoute("/_app/issues")({
  component: () => (
    <PlaceholderPage
      icon={ListTodoIcon}
      title="My Issues"
      description="As issues atribuídas a você aparecerão aqui."
    />
  ),
});
