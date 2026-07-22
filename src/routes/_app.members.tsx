import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { memberColumns } from "@/features/members/columns";
import { InviteMemberDialog } from "@/features/members/invite-member-dialog";
import { useRemoveMember } from "@/features/members/mutations";
import { membersQueryOptions } from "@/features/members/queries";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_app/members")({
  head: () => ({ meta: [{ title: "Membros · adila.co" }] }),
  // Prefetch no loader deixa a lista pronta antes do componente montar. Como
  // usamos a mesma `membersQueryOptions`, o `useQuery` abaixo lê do cache.
  loader: ({ context }) => context.queryClient.ensureQueryData(membersQueryOptions),
  component: Members,
});

function Members() {
  const { data: members, isPending, isError, refetch } = useQuery(membersQueryOptions);
  const removeMember = useRemoveMember();

  const columns = useMemo(
    () => memberColumns({ onRemove: (id) => removeMember.mutate(id) }),
    [removeMember],
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Membros</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Query + mutations do TanStack Query: convite invalida o cache, remoção é otimista.
          </p>
        </div>
        <InviteMemberDialog />
      </div>

      {isPending ? (
        <div className="space-y-2 rounded-md border p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-md border border-destructive/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os membros.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-2 text-sm font-medium text-primary underline underline-offset-4"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <DataTable columns={columns} data={members} />
      )}
    </div>
  );
}
