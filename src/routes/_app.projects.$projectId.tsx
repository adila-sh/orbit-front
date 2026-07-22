import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, FolderKanbanIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { projectQueryOptions } from "@/features/workspace/queries";

export const Route = createFileRoute("/_app/projects/$projectId")({
  component: ProjectOverview,
});

function ProjectOverview() {
  const { projectId } = Route.useParams();
  const project = useQuery(projectQueryOptions(projectId));
  if (project.isPending)
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  if (project.isError || !project.data)
    return (
      <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
        Projeto não encontrado.
      </p>
    );
  const current = project.data;
  return (
    <div className="space-y-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Voltar para Projects
      </Link>
      <div className="flex items-center gap-4">
        <span
          className="grid size-12 place-items-center rounded-xl text-lg font-semibold text-white"
          style={{ backgroundColor: current.color ?? "#8b5cf6" }}
        >
          {current.icon ?? <FolderKanbanIcon className="size-5" />}
        </span>
        <div>
          <p className="font-mono text-sm text-muted-foreground">{current.key}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{current.name}</h1>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sobre o projeto</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {current.description ?? "Sem descrição."}
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">{current.status}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Issues</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">Em breve</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Milestones</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">Em breve</CardContent>
        </Card>
      </div>
    </div>
  );
}
