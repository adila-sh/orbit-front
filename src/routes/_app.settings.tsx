import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

const NOTIFICATIONS: readonly ToggleSetting[] = [
  {
    id: "notify-product",
    label: "Novidades do produto",
    description: "Receba e-mails sobre lançamentos e melhorias.",
    defaultChecked: true,
  },
  {
    id: "notify-security",
    label: "Alertas de segurança",
    description: "Avisos sobre acessos e atividades suspeitas.",
    defaultChecked: true,
  },
  {
    id: "notify-marketing",
    label: "Comunicações de marketing",
    description: "Dicas, pesquisas e ofertas ocasionais.",
    defaultChecked: false,
  },
];

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Configurações</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie preferências da conta e do espaço de trabalho.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="Português (Brasil)">
              <SelectTrigger id="language" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Português (Brasil)">Português (Brasil)</SelectItem>
                <SelectItem value="English (US)">English (US)</SelectItem>
                <SelectItem value="Español">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="timezone">Fuso horário</Label>
            <Select defaultValue="America/São Paulo (GMT-3)">
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/São Paulo (GMT-3)">America/São Paulo (GMT-3)</SelectItem>
                <SelectItem value="America/New York (GMT-5)">America/New York (GMT-5)</SelectItem>
                <SelectItem value="Europe/Lisbon (GMT+0)">Europe/Lisbon (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {NOTIFICATIONS.map((setting, index) => (
            <div key={setting.id}>
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between gap-4 py-4">
                <div className="space-y-0.5">
                  <Label htmlFor={setting.id} className="font-medium">
                    {setting.label}
                  </Label>
                  <p className="text-sm text-muted-foreground text-pretty">{setting.description}</p>
                </div>
                <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de perigo</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Excluir conta</p>
            <p className="text-sm text-muted-foreground text-pretty">
              Remove permanentemente sua conta e todos os dados. Esta ação é irreversível.
            </p>
          </div>
          <Button
            variant="destructive"
            className="shrink-0"
            onClick={() => toast.error("Ação de exemplo — nada foi excluído.")}
          >
            Excluir
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
