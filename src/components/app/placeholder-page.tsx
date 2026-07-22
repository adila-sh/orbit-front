import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderPageProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PlaceholderPage({ icon: Icon, title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card className="border-dashed">
        <CardHeader className="items-center text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-6" />
          </span>
          <CardTitle className="mt-2 text-base">Esta área está sendo preparada</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          O shell já está conectado ao workspace ativo. Esta tela entra na próxima fatia vertical.
        </CardContent>
      </Card>
    </div>
  );
}
