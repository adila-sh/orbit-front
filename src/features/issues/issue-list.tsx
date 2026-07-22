import { Link } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { issuesQueryOptions } from "@/features/issues/queries";
import type { IssueStatus } from "@/features/issues/api";
import { IssueCardContent } from "@/features/issues/issue-card";
import { PriorityBadge, StatusBadge } from "@/features/issues/issue-meta";

export function IssueList({
  title,
  description,
  filters = {},
}: {
  title: string;
  description: string;
  filters?: { status?: IssueStatus; assigneeId?: string };
}) {
  const [search, setSearch] = useState("");
  const issues = useQuery(issuesQueryOptions({ ...filters, q: search || undefined }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="relative max-w-sm">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por título ou identificador..."
          className="pl-9"
        />
      </div>
      {issues.isPending ? (
        <div className="space-y-2 rounded-xl border p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      ) : issues.isError ? (
        <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
          Não foi possível carregar as issues.
        </p>
      ) : issues.data.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nenhuma issue encontrada.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="grid grid-cols-[minmax(0,1fr)_130px_130px] gap-4 border-b bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Issue</span>
            <span>Status</span>
            <span>Prioridade</span>
          </div>
          <div className="divide-y">
            {issues.data.map((issue) => (
              <Link
                key={issue.id}
                to="/issues/$issueId"
                params={{ issueId: issue.id }}
                className="grid grid-cols-[minmax(0,1fr)_130px_130px] items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <span className="min-w-0">
                  <IssueCardContent issue={issue} compact />
                </span>
                <StatusBadge status={issue.status} />
                <PriorityBadge priority={issue.priority} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
