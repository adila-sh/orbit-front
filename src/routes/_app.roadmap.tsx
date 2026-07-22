import { createFileRoute } from "@tanstack/react-router";
import { MapIcon } from "lucide-react";

import { MilestoneTimeline } from "@/features/milestones/milestone-timeline";

export const Route = createFileRoute("/_app/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap · Adila Orbit" }] }),
  component: Roadmap,
});

function Roadmap() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <MapIcon className="size-5" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Roadmap</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Timeline de milestones dos projetos do workspace ativo.
          </p>
        </div>
      </div>
      <MilestoneTimeline />
    </div>
  );
}
