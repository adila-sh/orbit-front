import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { projectsQueryOptions } from "@/features/workspace/queries";
import { useWorkspace } from "@/features/workspace/workspace-context";

export function WorkspaceSwitcher() {
  const queryClient = useQueryClient();
  const organizations = authClient.useListOrganizations();
  const { organizationId: activeId, organizationName } = useWorkspace();
  const activeName = organizationName ?? "Selecionar workspace";

  async function selectOrganization(organizationId: string) {
    if (organizationId === activeId) return;
    const result = await authClient.organization.setActive({ organizationId });
    if (result.error) {
      toast.error("Não foi possível trocar de workspace.");
      return;
    }
    await queryClient.invalidateQueries({ queryKey: projectsQueryOptions.queryKey });
    toast.success("Workspace alterado.");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="w-full justify-between px-2" />}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            {activeName.slice(0, 1).toUpperCase()}
          </span>
          <span className="truncate text-sm font-medium">{activeName}</span>
        </span>
        <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Seus workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.isPending ? (
          <DropdownMenuItem disabled>Carregando...</DropdownMenuItem>
        ) : organizations.data?.length ? (
          organizations.data.map((organization) => (
            <DropdownMenuItem
              key={organization.id}
              onClick={() => void selectOrganization(organization.id)}
            >
              <span className="grid size-6 place-items-center rounded bg-muted text-xs font-medium">
                {organization.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="truncate">{organization.name}</span>
              {organization.id === activeId && <CheckIcon className="ml-auto size-4" />}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>Nenhum workspace disponível</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <PlusIcon className="size-4" />
          Criar workspace em breve
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
