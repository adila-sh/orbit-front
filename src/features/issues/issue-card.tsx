import { Badge } from "@/components/ui/badge";
import type { Issue } from "@/features/issues/api";

const PRIORITY_LABELS = {
  no_priority: "Sem prioridade",
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
} as const;

export function IssueCardContent({ issue, compact = false }: { issue: Issue; compact?: boolean }) {
  if (compact)
    return (
      <>
        <span className="mr-3 font-mono text-xs text-muted-foreground">{issue.identifier}</span>
        <span className="truncate text-sm font-medium">{issue.title}</span>
      </>
    );

  return (
    <>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs text-muted-foreground">{issue.identifier}</p>
        <p className="mt-1 text-sm font-medium leading-snug">{issue.title}</p>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <Badge variant="outline" className="text-[10px]">
          {PRIORITY_LABELS[issue.priority]}
        </Badge>
        {issue.projectKey && (
          <span className="truncate text-[10px] text-muted-foreground">{issue.projectKey}</span>
        )}
      </div>
    </>
  );
}
