import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

/**
 * Fallback de 404. Ligado em `createRouter` como `defaultNotFoundComponent`,
 * cobrindo tanto URLs desconhecidas quanto `throw notFound()` nos loaders.
 */
export function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <p className="text-6xl font-bold tracking-tight text-muted-foreground/40">404</p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          O endereço acessado não existe ou foi movido.
        </p>
        <Button className="mt-6" render={<Link to="/" />}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
