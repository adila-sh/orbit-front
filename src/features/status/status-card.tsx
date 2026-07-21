import { useQuery } from "@tanstack/react-query";
import { PlugZapIcon, RefreshCwIcon } from "lucide-react";

import { statusQueryOptions } from "@/features/status/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function StatusCard() {
  const { data, isPending, isFetching, refetch } = useQuery(statusQueryOptions);

  const reachable = data?.reachable ?? false;

  return (
    <Card className="relative overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/10 blur-2xl"
      />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlugZapIcon className="size-4 text-primary" />
          Backend
        </CardTitle>
        <CardDescription>
          TanStack Query buscando via Better Fetch em{" "}
          <code className="font-mono text-xs">{data?.url ?? "…"}</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        {isPending ? (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner /> Verificando conexão…
          </span>
        ) : reachable ? (
          <Badge className="gap-1.5">
            <span className="size-1.5 rounded-full bg-primary-foreground" />
            Conectado
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1.5 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-warning" />
            Offline — suba o template-back
          </Badge>
        )}

        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? <Spinner /> : <RefreshCwIcon />}
          Testar
        </Button>
      </CardContent>
    </Card>
  );
}
