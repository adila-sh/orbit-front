import { Link } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueCardContent } from "@/features/issues/issue-card";
import { issuesQueryOptions } from "@/features/issues/queries";
import {
  AssigneeAvatar,
  PriorityBadge,
  StatusBadge,
  TypeBadge,
} from "@/features/issues/issue-meta";

export function IssueTableView() {
  const [search, setSearch] = useState("");
  const issues = useQuery(issuesQueryOptions({ q: search || undefined }));

  if (issues.isPending) return <Skeleton className="h-[32rem] rounded-xl" />;
  if (issues.isError)
    return (
      <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
        Não foi possível carregar a tabela de issues.
      </p>
    );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por título ou identificador..."
          className="pl-9"
        />
      </div>
      {issues.data.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nenhuma issue encontrada.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Prioridade</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Responsável</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {issues.data.map((issue) => (
                <tr key={issue.id} className="transition-colors hover:bg-muted/40">
                  <td className="max-w-[420px] px-4 py-3">
                    <Link
                      to="/issues/$issueId"
                      params={{ issueId: issue.id }}
                      className="block truncate hover:underline"
                    >
                      <IssueCardContent issue={issue} compact />
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={issue.status} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={issue.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <TypeBadge type={issue.type} />
                  </td>
                  <td className="px-4 py-3">
                    <AssigneeAvatar assigneeId={issue.assigneeId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
