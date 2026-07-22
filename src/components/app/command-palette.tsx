import { useNavigate } from "@tanstack/react-router";
import { CommandIcon, FolderKanbanIcon, ListTodoIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createIssue } from "@/features/issues/api";
import { issuesQueryOptions } from "@/features/issues/queries";
import { projectsQueryOptions } from "@/features/workspace/queries";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const issues = useQuery({ ...issuesQueryOptions({ q: search || undefined }), enabled: open });
  const projects = useQuery({ ...projectsQueryOptions, enabled: open || createOpen });
  const createMutation = useMutation({
    mutationFn: () =>
      createIssue({ projectId, title: title.trim(), description: description.trim() }),
    onSuccess: (issue) => {
      void queryClient.invalidateQueries({ queryKey: ["orbit", "issues"] });
      setCreateOpen(false);
      setTitle("");
      setDescription("");
      setProjectId("");
      if (issue) void navigate({ to: "/issues/$issueId", params: { issueId: issue.id } });
    },
  });

  useKeyboardShortcuts({
    onCommand: () => setCreateOpen(true),
    onProjects: () => void navigate({ to: "/projects" }),
  });
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
    else setSearch("");
  }, [open]);

  useEffect(() => {
    if (createOpen && projects.data?.[0] && !projectId) setProjectId(projects.data[0].id);
  }, [createOpen, projectId, projects.data]);

  const matchingProjects =
    projects.data?.filter((project) =>
      `${project.name} ${project.key}`.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span>Buscar</span>
        <kbd className="ml-auto rounded border bg-muted px-1.5 font-mono text-[10px]">/</kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl gap-0 overflow-hidden p-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CommandIcon className="size-4" />
              Command palette
            </DialogTitle>
            <DialogDescription>Busque issues e projetos ou use atalhos.</DialogDescription>
          </DialogHeader>
          <div className="border-b p-4">
            <div className="relative">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {search &&
              issues.data?.map((issue) => (
                <button
                  key={issue.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"
                  onClick={() => {
                    setOpen(false);
                    void navigate({ to: "/issues/$issueId", params: { issueId: issue.id } });
                  }}
                >
                  <ListTodoIcon className="size-4 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {issue.identifier}
                  </span>
                  <span className="truncate text-sm">{issue.title}</span>
                </button>
              ))}
            {search &&
              matchingProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"
                  onClick={() => {
                    setOpen(false);
                    void navigate({
                      to: "/projects/$projectId",
                      params: { projectId: project.id },
                    });
                  }}
                >
                  <FolderKanbanIcon className="size-4 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">{project.key}</span>
                  <span className="truncate text-sm">{project.name}</span>
                </button>
              ))}
            {!search && (
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"
                onClick={() => {
                  setOpen(false);
                  setCreateOpen(true);
                }}
              >
                <PlusIcon className="size-4 text-muted-foreground" />
                <span className="text-sm">Criar nova issue</span>
                <kbd className="ml-auto rounded border px-1.5 font-mono text-[10px]">C</kbd>
              </button>
            )}
            {search && !issues.data?.length && !matchingProjects.length && (
              <p className="p-6 text-center text-sm text-muted-foreground">
                Nenhum resultado encontrado.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
            <span>
              <kbd className="rounded border px-1">Esc</kbd> fechar
            </span>
            <span>
              <kbd className="rounded border px-1">G</kbd>{" "}
              <kbd className="rounded border px-1">P</kbd> Projects
            </span>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar issue</DialogTitle>
            <DialogDescription>Registre uma nova tarefa no projeto selecionado.</DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (title.trim() && projectId) createMutation.mutate();
            }}
          >
            <Input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Título da issue"
              required
            />
            <select
              className="h-9 rounded-md border bg-transparent px-3 text-sm"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
              required
            >
              <option value="">Selecione um projeto</option>
              {projects.data?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.key} · {project.name}
                </option>
              ))}
            </select>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descrição (opcional)"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setCreateOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || !projectId || createMutation.isPending}
              >
                {createMutation.isPending ? "Criando..." : "Criar issue"}
              </Button>
            </div>
            {createMutation.error && (
              <p className="text-sm text-destructive">{createMutation.error.message}</p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
