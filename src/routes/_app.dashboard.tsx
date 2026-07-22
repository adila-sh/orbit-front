import { createFileRoute } from "@tanstack/react-router";
import {
  ActivityIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  FolderKanbanIcon,
  ListTodoIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { issuesQueryOptions } from "@/features/issues/queries";
import { projectsQueryOptions } from "@/features/workspace/queries";
import type { IssueStatus } from "@/features/issues/api";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Adila Orbit" }] }),
  component: Dashboard,
});

const STATUS_LABELS: Record<IssueStatus, string> = {
  backlog: "Backlog",
  todo: "A fazer",
  in_progress: "Em andamento",
  in_review: "Em revisão",
  done: "Concluídas",
  closed: "Fechadas",
};

function Dashboard() {
  const session = authClient.useSession();
  const issues = useQuery(issuesQueryOptions());
  const projects = useQuery(projectsQueryOptions);
  const firstName = session.data?.user.name.split(" ")[0] ?? "aí";
  const rows = issues.data ?? [];
  const now = Date.now();
  const completed = rows.filter(
    (issue) => issue.status === "done" || issue.status === "closed",
  ).length;
  const inProgress = rows.filter(
    (issue) => issue.status === "in_progress" || issue.status === "in_review",
  ).length;
  const overdue = rows.filter(
    (issue) =>
      issue.dueDate &&
      new Date(issue.dueDate).getTime() < now &&
      !["done", "closed"].includes(issue.status),
  ).length;
  const counts = (Object.keys(STATUS_LABELS) as IssueStatus[]).map((status) => ({
    status,
    count: rows.filter((issue) => issue.status === status).length,
  }));
  const maxCount = Math.max(...counts.map((item) => item.count), 1);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Olá, {firstName} 👋</h2>
        <p className="mt-1 text-sm text-muted-foreground">Uma visão rápida do seu workspace.</p>
      </div>
      {issues.isPending || projects.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : issues.isError || projects.isError ? (
        <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          Não foi possível carregar as métricas do workspace.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={ListTodoIcon} label="Total de issues" value={rows.length} />
            <MetricCard
              icon={CheckCircle2Icon}
              label="Concluídas"
              value={completed}
              tone="success"
            />
            <MetricCard icon={ActivityIcon} label="Em andamento" value={inProgress} />
            <MetricCard
              icon={CircleAlertIcon}
              label="Atrasadas"
              value={overdue}
              tone={overdue ? "danger" : "default"}
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Issues por status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {counts.map(({ status, count }) => (
                  <div
                    key={status}
                    className="grid grid-cols-[110px_1fr_32px] items-center gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">{STATUS_LABELS[status]}</span>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-right font-mono text-xs">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FolderKanbanIcon className="size-4" />
                  Projetos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{projects.data.length}</p>
                <p className="mt-1 text-sm text-muted-foreground">projetos no workspace ativo</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof ListTodoIcon;
  label: string;
  value: number;
  tone?: "default" | "success" | "danger";
}) {
  const color =
    tone === "success" ? "text-success" : tone === "danger" ? "text-destructive" : "text-primary";
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className={`size-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
