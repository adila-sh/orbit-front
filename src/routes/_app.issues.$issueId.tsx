import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, Clock3Icon, MessageSquareIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/features/issues/api";
import {
  activityQueryOptions,
  commentsQueryOptions,
  issueQueryOptions,
} from "@/features/issues/queries";

export const Route = createFileRoute("/_app/issues/$issueId")({
  head: () => ({ meta: [{ title: "Issue · Adila Orbit" }] }),
  component: IssueDetail,
});

function IssueDetail() {
  const { issueId } = Route.useParams();
  const client = useQueryClient();
  const issue = useQuery(issueQueryOptions(issueId));
  const activity = useQuery(activityQueryOptions(issueId));
  const comments = useQuery(commentsQueryOptions(issueId));
  const [body, setBody] = useState("");
  const commentMutation = useMutation({
    mutationFn: () => createComment(issueId, body),
    onSuccess: async () => {
      setBody("");
      await Promise.all([
        client.invalidateQueries({ queryKey: commentsQueryOptions(issueId).queryKey }),
        client.invalidateQueries({ queryKey: activityQueryOptions(issueId).queryKey }),
      ]);
    },
  });

  if (issue.isPending)
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  if (issue.isError || !issue.data)
    return (
      <p className="mx-auto max-w-5xl rounded-lg border border-destructive/30 p-6 text-sm text-destructive">
        Issue não encontrada.
      </p>
    );

  const current = issue.data;
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        to="/issues"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Voltar para My Issues
      </Link>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground">{current.identifier}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{current.title}</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Descrição</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap text-sm text-muted-foreground">
              {current.description ?? "Sem descrição."}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquareIcon className="size-4" />
                Comentários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.isPending ? (
                <Skeleton className="h-12 w-full" />
              ) : comments.data?.length ? (
                comments.data.map((comment) => (
                  <div key={comment.id} className="rounded-lg bg-muted/40 p-3 text-sm">
                    <p className="text-xs text-muted-foreground">{comment.authorId}</p>
                    <p className="mt-1 whitespace-pre-wrap">{comment.body}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Ainda não há comentários.</p>
              )}
              <div className="space-y-2">
                <Textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Escreva um comentário..."
                />
                <Button
                  size="sm"
                  disabled={!body.trim() || commentMutation.isPending}
                  onClick={() => commentMutation.mutate()}
                >
                  <SendIcon className="size-4" />
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline">{current.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prioridade</span>
                <span>{current.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span>{current.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimativa</span>
                <span>{current.estimate ?? "—"}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock3Icon className="size-4" />
                Atividade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.data?.length ? (
                activity.data.map((item) => (
                  <div key={item.id} className="text-sm">
                    <p className="font-medium">{item.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sem atividade registrada.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
