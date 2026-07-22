import { CalendarDaysIcon, CircleDotIcon, FlagIcon } from "lucide-react";
import { useQueries, useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { milestonesQueryOptions } from "@/features/milestones/queries";
import { projectsQueryOptions } from "@/features/workspace/queries";

function formatDate(date: string | null) {
  if (!date) return "Sem prazo definido";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(date));
}

export function MilestoneTimeline() {
  const projects = useQuery(projectsQueryOptions);
  const milestoneQueries = useQueries({
    queries: projects.data?.map((project) => milestonesQueryOptions(project.id)) ?? [],
  });
  const milestones = projects.data?.flatMap((project, index) =>
    (milestoneQueries[index]?.data ?? []).map((milestone) => ({
      ...milestone,
      projectName: project.name,
      projectKey: project.key,
      projectColor: project.color,
    })),
  );
  // oxlint-disable-next-line unicorn/no-array-sort -- copia local já evita mutar o resultado da query
  const timeline = [...(milestones ?? [])].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  if (projects.isPending || milestoneQueries.some((query) => query.isPending))
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  if (projects.isError || milestoneQueries.some((query) => query.isError))
    return (
      <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
        Não foi possível carregar os milestones.
      </p>
    );
  if (!timeline.length)
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted-foreground">
          <FlagIcon className="size-6" />
          Nenhum milestone cadastrado nos projetos deste workspace.
        </CardContent>
      </Card>
    );

  return (
    <div className="relative space-y-3 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-border">
      {timeline.map((milestone) => (
        <Card key={milestone.id} className="relative ml-3">
          <CardHeader className="flex-row items-start gap-3 space-y-0 pb-2">
            <span
              className="z-10 mt-1 grid size-5 shrink-0 place-items-center rounded-full border-2 border-background"
              style={{ backgroundColor: milestone.projectColor ?? "#8b5cf6" }}
            >
              <CircleDotIcon className="size-3 text-white" />
            </span>
            <div className="min-w-0">
              <CardTitle className="text-base">{milestone.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {milestone.projectKey} · {milestone.projectName}
              </p>
            </div>
            <span className="ml-auto shrink-0 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
              {milestone.status}
            </span>
          </CardHeader>
          <CardContent className="ml-8 space-y-2 text-sm">
            {milestone.description && (
              <p className="text-muted-foreground">{milestone.description}</p>
            )}
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDaysIcon className="size-3.5" />
              {formatDate(milestone.dueDate)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
