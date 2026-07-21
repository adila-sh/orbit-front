import { createFileRoute } from "@tanstack/react-router";
import {
  ActivityIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  DollarSignIcon,
  UsersIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

import { StatusCard } from "@/features/status/status-card";
import { statusQueryOptions } from "@/features/status/queries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CURRENT_USER } from "@/features/account/mock";

interface Stat {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
}

const STATS: readonly Stat[] = [
  { label: "Receita", value: "R$ 48,2 mil", delta: 12.5, icon: DollarSignIcon },
  { label: "Usuários ativos", value: "2.340", delta: 8.1, icon: UsersIcon },
  { label: "Requisições", value: "1,2 mi", delta: -3.4, icon: ZapIcon },
  { label: "Uptime", value: "99,98%", delta: 0.2, icon: ActivityIcon },
];

interface ActivityItem {
  who: string;
  what: string;
  when: string;
}

const ACTIVITY: readonly ActivityItem[] = [
  { who: "Ada Lovelace", what: "publicou uma nova versão", when: "há 5 min" },
  { who: "Alan Turing", what: "abriu o pull request #128", when: "há 22 min" },
  { who: "Grace Hopper", what: "aprovou o deploy de produção", when: "há 1 h" },
  { who: "Edsger Dijkstra", what: "comentou em uma issue", when: "há 3 h" },
  { who: "Margaret Hamilton", what: "corrigiu a pipeline de CI", when: "ontem" },
];

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · adila.co" }] }),
  loader: ({ context }) => context.queryClient.prefetchQuery(statusQueryOptions),
  component: Dashboard,
});

function Dashboard() {
  const firstName = CURRENT_USER.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Olá, {firstName} 👋</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Aqui está um resumo do que aconteceu enquanto você esteve fora.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const positive = stat.delta >= 0;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
                <p
                  className={
                    positive
                      ? "mt-1 flex items-center gap-1 text-xs font-medium text-success"
                      : "mt-1 flex items-center gap-1 text-xs font-medium text-destructive"
                  }
                >
                  {positive ? (
                    <ArrowUpRightIcon className="size-3" />
                  ) : (
                    <ArrowDownRightIcon className="size-3" />
                  )}
                  {positive ? "+" : ""}
                  {stat.delta}% vs. mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <ul className="divide-y divide-border/60">
              {ACTIVITY.map((item) => (
                <li key={`${item.who}-${item.when}`} className="flex items-center gap-3 py-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {item.who
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <p className="text-sm text-pretty">
                    <span className="font-medium">{item.who}</span>{" "}
                    <span className="text-muted-foreground">{item.what}</span>
                  </p>
                  <Badge variant="outline" className="ml-auto shrink-0 font-mono text-[0.7rem]">
                    {item.when}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <StatusCard />
      </div>
    </div>
  );
}
