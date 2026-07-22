import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { IssuePriority, IssueStatus, IssueType } from "@/features/issues/api";

const STATUS_LABELS: Record<IssueStatus, string> = {
  backlog: "Backlog",
  todo: "A fazer",
  in_progress: "Em andamento",
  in_review: "Em revisão",
  done: "Concluída",
  closed: "Fechada",
};
const PRIORITY_LABELS: Record<IssuePriority, string> = {
  no_priority: "Sem prioridade",
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
};
const TYPE_LABELS: Record<IssueType, string> = {
  epic: "Épico",
  story: "Story",
  task: "Tarefa",
  bug: "Bug",
  improvement: "Melhoria",
};

export function StatusBadge({ status }: { status: IssueStatus }) {
  return (
    <Badge variant={status === "done" || status === "closed" ? "secondary" : "outline"}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: IssuePriority }) {
  return (
    <Badge variant={priority === "urgent" || priority === "high" ? "destructive" : "outline"}>
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}

export function TypeBadge({ type }: { type: IssueType }) {
  return <Badge variant="secondary">{TYPE_LABELS[type]}</Badge>;
}

export function AssigneeAvatar({ assigneeId }: { assigneeId: string | null }) {
  const initials = assigneeId ? assigneeId.slice(0, 2).toUpperCase() : "—";
  return (
    <Avatar size="sm" title={assigneeId ? `Responsável: ${assigneeId}` : "Sem responsável"}>
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
