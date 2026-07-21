import { Link } from "@tanstack/react-router";

const LEGAL = [
  { to: "/terms", label: "Termos de uso" },
  { to: "/privacy", label: "Privacidade" },
] as const;

const RESOURCES = [
  { href: "https://ds.adila.co/docs", label: "Design System" },
  { href: "https://github.com/adila-sh/template-front", label: "GitHub" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link to="/" className="flex w-fit items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-6 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              L
            </span>
            template-front
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground text-pretty">
            O ponto de partida front-end da adila.co — SSR, design system e cache de servidor já
            conectados.
          </p>
        </div>

        <nav aria-label="Legal">
          <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Legal
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {LEGAL.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Recursos">
          <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Recursos
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {RESOURCES.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 adila.co. Todos os direitos reservados.</p>
          <p className="font-mono">template-front</p>
        </div>
      </div>
    </footer>
  );
}
