import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { FolderKanbanIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { projectsQueryOptions } from "@/features/workspace/queries";

export const Route = createFileRoute("/_app/projects")({
  head: () => ({ meta: [{ title: "Projetos · Adila Orbit" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  component: Projects,
});

function Projects() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname.startsWith("/projects/")) return <Outlet />;

  const projects = useQuery(projectsQueryOptions);
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Projetos</h2>
        <p className="mt-1 text-sm text-muted-foreground">Projetos do workspace ativo.</p>
      </div>
      {projects.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : projects.isError ? (
        <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          Não foi possível carregar os projetos.
        </p>
      ) : projects.data.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nenhum projeto neste workspace.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.data.map((project) => (
            <Link key={project.id} to="/projects/$projectId" params={{ projectId: project.id }}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                  <span
                    className="grid size-9 place-items-center rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: project.color ?? "#8b5cf6" }}
                  >
                    {project.icon ?? <FolderKanbanIcon className="size-4" />}
                  </span>
                  <div className="min-w-0">
                    <CardTitle className="truncate text-base">{project.name}</CardTitle>
                    <p className="font-mono text-xs text-muted-foreground">{project.key}</p>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {project.description ?? "Sem descrição."}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
