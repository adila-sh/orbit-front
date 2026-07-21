import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useInviteMember } from "@/features/members/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const inviteSchema = z.object({
  name: z.string().trim().min(2, "Informe pelo menos 2 caracteres."),
  email: z.email("E-mail inválido."),
  role: z.enum(["Admin", "Editor", "Viewer"]),
});

type InviteForm = z.infer<typeof inviteSchema>;

const DEFAULT_VALUES: InviteForm = { name: "", email: "", role: "Editor" };

/**
 * Padrão de formulário validado: React Hook Form + zodResolver, plugado numa
 * mutation do TanStack Query. O diálogo fecha e o form reseta apenas no sucesso.
 */
export function InviteMemberDialog() {
  const [open, setOpen] = useState(false);
  const inviteMember = useInviteMember();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function onSubmit(values: InviteForm) {
    inviteMember.mutate(values, {
      onSuccess: () => {
        reset(DEFAULT_VALUES);
        setOpen(false);
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          reset(DEFAULT_VALUES);
        }
      }}
    >
      <DialogTrigger render={<Button size="sm" />}>
        <PlusIcon />
        Convidar
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar membro</DialogTitle>
          <DialogDescription>Envie um convite por e-mail para a equipe.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-5 pt-2" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="invite-name">Nome</FieldLabel>
            <Input id="invite-name" placeholder="Ada Lovelace" {...register("name")} />
            <FieldError errors={errors.name ? [errors.name] : undefined} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="invite-email">E-mail</FieldLabel>
            <Input
              id="invite-email"
              type="email"
              placeholder="ada@adila.co"
              {...register("email")}
            />
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </Field>

          <Field data-invalid={!!errors.role}>
            <FieldLabel htmlFor="invite-role">Papel</FieldLabel>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="invite-role" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.role ? [errors.role] : undefined} />
          </Field>

          <DialogFooter className="mt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={inviteMember.isPending}>
              {inviteMember.isPending && <Spinner />}
              Enviar convite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
