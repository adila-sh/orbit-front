import { Link } from "@tanstack/react-router";

import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-6 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            L
          </span>
          template-front
        </Link>
        <Badge variant="secondary" className="hidden font-mono text-[0.7rem] lg:inline-flex">
          adila.co · TanStack Start
        </Badge>

        <nav className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href="https://ds.adila.co/docs" target="_blank" rel="noreferrer" />}
          >
            Design System
          </Button>
          <ModeToggle />
          <Button size="sm" render={<Link to="/auth" />}>
            Entrar
          </Button>
        </nav>
      </div>
    </header>
  );
}
