import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Fallback de erro global. Ligado em `createRouter` como `defaultErrorComponent`,
 * então qualquer rota que lançar durante loader/render cai aqui. `reset` limpa o
 * estado de erro e tenta renderizar de novo.
 */
export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : "Erro inesperado.";

  return (
    <div className="grid min-h-svh place-items-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
          <AlertTriangleIcon className="size-6" />
        </span>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">Algo deu errado</h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">{message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button
            onClick={() => {
              reset();
              void router.invalidate();
            }}
          >
            Tentar novamente
          </Button>
          <Button variant="outline" render={<Link to="/" />}>
            Ir para o início
          </Button>
        </div>
      </div>
    </div>
  );
}
