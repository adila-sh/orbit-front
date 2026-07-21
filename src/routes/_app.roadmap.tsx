import { createFileRoute } from "@tanstack/react-router";
import { MapIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/app/placeholder-page";

export const Route = createFileRoute("/_app/roadmap")({
  component: () => (
    <PlaceholderPage
      icon={MapIcon}
      title="Roadmap"
      description="A timeline de milestones será conectada em uma próxima fatia."
    />
  ),
});
