import {
  closestCorners,
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVerticalIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { moveIssue, type Issue, type IssuePriority, type IssueStatus } from "@/features/issues/api";
import { IssueCardContent } from "@/features/issues/issue-card";
import { issuesQueryOptions } from "@/features/issues/queries";

const COLUMNS: { id: IssueStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "A fazer" },
  { id: "in_progress", label: "Em andamento" },
  { id: "in_review", label: "Em revisão" },
  { id: "done", label: "Concluídas" },
  { id: "closed", label: "Fechadas" },
];

const PRIORITY_LABELS = {
  no_priority: "Sem prioridade",
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
} as const;

function IssueCard({ issue, overlay = false }: { issue: Issue; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    data: { status: issue.status },
  });
  return (
    <Link
      ref={setNodeRef}
      to="/issues/$issueId"
      params={{ issueId: issue.id }}
      {...attributes}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`group block rounded-lg border bg-card p-3 shadow-xs transition-shadow hover:shadow-md ${
        isDragging || overlay ? "opacity-70 shadow-lg" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-label={`Mover ${issue.identifier}`}
          className="mt-0.5 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          {...listeners}
          onClick={(event) => event.preventDefault()}
        >
          <GripVerticalIcon className="size-4" />
        </button>
        <IssueCardContent issue={issue} />
      </div>
    </Link>
  );
}

function BoardColumn({
  status,
  issues,
  groupBy,
}: {
  status: (typeof COLUMNS)[number];
  issues: Issue[];
  groupBy: "none" | "priority";
}) {
  const { isOver, setNodeRef } = useDroppable({ id: status.id, data: { status: status.id } });
  return (
    <section
      ref={setNodeRef}
      className={`flex min-h-96 min-w-64 flex-1 flex-col rounded-xl bg-muted/40 p-3 transition-colors ${
        isOver ? "bg-primary/10" : ""
      }`}
    >
      <header className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">{status.label}</h3>
        <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
          {issues.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-3">
        {groupBy === "priority"
          ? (Object.keys(PRIORITY_LABELS) as IssuePriority[]).map((priority) => {
              const grouped = issues.filter((issue) => issue.priority === priority);
              if (!grouped.length) return null;
              return (
                <div key={priority} className="space-y-2">
                  <p className="px-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {PRIORITY_LABELS[priority]}
                  </p>
                  {grouped.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              );
            })
          : issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
        {!issues.length && (
          <p className="p-4 text-center text-xs text-muted-foreground">Solte uma issue aqui.</p>
        )}
      </div>
    </section>
  );
}

export function KanbanBoard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | "all">("all");
  const [groupBy, setGroupBy] = useState<"none" | "priority">("none");
  const issues = useQuery(issuesQueryOptions({ q: search || undefined }));
  const [boardIssues, setBoardIssues] = useState<Issue[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const moveMutation = useMutation({
    mutationFn: ({
      issueId,
      status,
      beforeId,
      afterId,
    }: {
      issueId: string;
      status: IssueStatus;
      beforeId?: string;
      afterId?: string;
    }) => moveIssue(issueId, { status, beforeId, afterId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orbit", "issues"] }),
    onError: () => setBoardIssues(issues.data ?? []),
  });

  useEffect(() => setBoardIssues(issues.data ?? []), [issues.data]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeIssue = boardIssues.find((issue) => issue.id === active.id);
    const overIssue = boardIssues.find((issue) => issue.id === over.id);
    const nextStatus = (over.data.current?.status ?? overIssue?.status) as IssueStatus | undefined;
    if (!activeIssue || !nextStatus || activeIssue.status === nextStatus) return;
    setBoardIssues((current) =>
      current.map((issue) =>
        issue.id === activeIssue.id ? { ...issue, status: nextStatus } : issue,
      ),
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const current = boardIssues;
    const issue = current.find((item) => item.id === active.id);
    const overIssue = current.find((item) => item.id === over.id);
    const status = (over.data.current?.status ?? overIssue?.status) as IssueStatus | undefined;
    if (!issue || !status) return;
    const siblings = current.filter((item) => item.status === status && item.id !== issue.id);
    const overIndex = overIssue
      ? siblings.findIndex((item) => item.id === overIssue.id)
      : siblings.length;
    const beforeId = overIndex >= 0 ? siblings[overIndex]?.id : undefined;
    const afterId = overIndex > 0 ? siblings[overIndex - 1]?.id : undefined;
    moveMutation.mutate({ issueId: issue.id, status, beforeId, afterId });
  }

  if (issues.isPending) return <Skeleton className="h-[32rem] rounded-xl" />;
  if (issues.isError)
    return (
      <p className="rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
        Não foi possível carregar o board.
      </p>
    );

  const activeIssue = activeId ? boardIssues.find((issue) => issue.id === activeId) : undefined;
  const visibleIssues =
    priorityFilter === "all"
      ? boardIssues
      : boardIssues.filter((issue) => issue.priority === priorityFilter);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar issues..."
            className="pl-9"
          />
        </div>
        <select
          aria-label="Filtrar por prioridade"
          className="h-9 rounded-md border bg-transparent px-3 text-sm"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value as IssuePriority | "all")}
        >
          <option value="all">Todas as prioridades</option>
          {(Object.keys(PRIORITY_LABELS) as IssuePriority[]).map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
        <select
          aria-label="Agrupar issues"
          className="h-9 rounded-md border bg-transparent px-3 text-sm"
          value={groupBy}
          onChange={(event) => setGroupBy(event.target.value as "none" | "priority")}
        >
          <option value="none">Sem agrupamento</option>
          <option value="priority">Agrupar por prioridade</option>
        </select>
      </div>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-3">
          {COLUMNS.map((status) => (
            <BoardColumn
              key={status.id}
              status={status}
              groupBy={groupBy}
              issues={visibleIssues.filter((issue) => issue.status === status.id)}
            />
          ))}
        </div>
        <DragOverlay>{activeIssue ? <IssueCard issue={activeIssue} overlay /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}
