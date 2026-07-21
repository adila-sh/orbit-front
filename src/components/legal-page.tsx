import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

interface LegalPageProps {
  title: string;
  /** Data da última atualização, já formatada (ex.: "3 de julho de 2026"). */
  updatedAt: string;
  children: ReactNode;
}

export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Badge variant="secondary" className="mb-5 font-mono text-[0.7rem]">
        Legal
      </Badge>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">Última atualização: {updatedAt}</p>

      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm text-muted-foreground text-pretty">
        Este é um texto de exemplo do template. Substitua por termos revisados pelo seu jurídico
        antes de ir para produção.
      </div>

      <article className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        {children}
      </article>
    </div>
  );
}
