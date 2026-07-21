import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxesIcon,
  DatabaseIcon,
  GaugeIcon,
  LayersIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STACK = [
  "TanStack Start",
  "TanStack Router",
  "TanStack Query",
  "adila.co UI",
  "Zustand",
  "Better Fetch",
  "Tailwind v4",
  "TypeScript",
] as const;

const FEATURES = [
  {
    icon: ServerIcon,
    title: "SSR de verdade",
    body: "Renderização no servidor com hidratação sem flash. Loaders fazem prefetch antes do primeiro paint.",
  },
  {
    icon: DatabaseIcon,
    title: "Server state pronto",
    body: "TanStack Query conectado ao SSR: defina uma query e compartilhe entre loader e componente.",
  },
  {
    icon: BoxesIcon,
    title: "Design system adila.co",
    body: "60+ primitivos shadcn sobre Base UI, já com o tema verde e tokens OKLCH em light e dark.",
  },
  {
    icon: LayersIcon,
    title: "Client state isolado",
    body: "Zustand para estado de UI, SSR-safe por padrão. Nada de duplicar dado de servidor no cliente.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Validado nas fronteiras",
    body: "Env e respostas de API passam por zod. Do lado de dentro, o TypeScript infere o resto.",
  },
  {
    icon: GaugeIcon,
    title: "Rápido de fábrica",
    body: "Better Fetch com contrato { data, error }, preload por intenção e build enxuto via Nitro.",
  },
] as const;

export const Route = createFileRoute("/_marketing/")({
  component: Landing,
});

function Landing() {
  return (
    <>
      <section className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-5 font-mono text-[0.7rem]">
              template-front
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              O ponto de partida front-end da <span className="text-primary">adila.co</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground text-pretty sm:text-xl">
              Full-stack React com SSR, o design system adila.co e cache de servidor já conectados.
              Clone, aponte para o backend e comece a construir o produto — não a fundação.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" render={<Link to="/auth" />}>
                Começar agora
                <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<a href="https://ds.adila.co/docs" target="_blank" rel="noreferrer" />}
              >
                Explorar o Design System
                <ArrowUpRightIcon />
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="font-mono text-[0.7rem]">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-28">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="bg-card p-6 transition-colors hover:bg-accent/40"
            >
              <feature.icon className="size-5 text-primary" />
              <h2 className="mt-4 font-semibold tracking-tight">{feature.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-16 size-64 rounded-full bg-primary/10 blur-3xl"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Do login ao dashboard, já montado.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground text-pretty">
            Telas reais de autenticação, painel, perfil e configurações — só com componentes do
            design system. Entre e veja.
          </p>
          <div className="relative mt-7 flex justify-center">
            <Button size="lg" render={<Link to="/auth" />}>
              Ver as telas
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
