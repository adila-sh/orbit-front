import { createFileRoute } from "@tanstack/react-router";
import { AtSignIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { CURRENT_USER, initials } from "@/features/account/mock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/profile")({
  component: Profile,
});

function handleSave() {
  // Mock: num app real, envie ao backend e trate { data, error }.
  toast.success("Perfil atualizado.");
}

function Profile() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="bg-primary/10 text-lg text-primary">
            {initials(CURRENT_USER.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{CURRENT_USER.name}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <AtSignIcon className="size-3.5" />
            {CURRENT_USER.username}
            <Badge variant="secondary" className="font-mono text-[0.7rem]">
              {CURRENT_USER.role}
            </Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações pessoais</CardTitle>
          <CardDescription>Como você aparece para o resto da equipe.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue={CURRENT_USER.name} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username">Usuário</Label>
                <div className="relative">
                  <AtSignIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="username" defaultValue={CURRENT_USER.username} className="pl-9" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <MailIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" defaultValue={CURRENT_USER.email} className="pl-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} defaultValue={CURRENT_USER.bio} />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
              <Button type="submit">Salvar alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
