import { createFileRoute } from "@tanstack/react-router";

import { MilestoneTimeline } from "@/features/milestones/milestone-timeline";

export const Route = createFileRoute("/_app/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap · Adila Orbit" }] }),
  component: Roadmap,
});

function Roadmap() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Roadmap</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Timeline de milestones dos projetos do workspace ativo.
        </p>
      </div>
      <MilestoneTimeline />
    </div>
  );
}
