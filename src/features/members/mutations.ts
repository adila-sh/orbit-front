import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { InviteMemberInput } from "@/features/members/api";
import type { Member } from "@/features/members/mock";
import { inviteMember, removeMember } from "@/features/members/api";
import { membersQueryKey } from "@/features/members/queries";

/**
 * Mutation simples: cria e **invalida** a query para refetch. É o padrão padrão
 * quando você não precisa de resposta instantânea na UI.
 */
export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: InviteMemberInput) => inviteMember(input),
    onSuccess: (member) => {
      toast.success(`${member.name} foi convidada.`);
      void queryClient.invalidateQueries({ queryKey: membersQueryKey });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Mutation **otimista**: remove da UI na hora, guarda um snapshot e faz rollback
 * se o backend falhar. Use quando a latência atrapalha a percepção de resposta.
 */
export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeMember(id),
    onMutate: async (id) => {
      // Cancela refetches em voo para não sobrescrever o update otimista.
      await queryClient.cancelQueries({ queryKey: membersQueryKey });
      const previous = queryClient.getQueryData<Member[]>(membersQueryKey);

      queryClient.setQueryData<Member[]>(membersQueryKey, (current) =>
        (current ?? []).filter((member) => member.id !== id),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      // Rollback para o snapshot capturado em `onMutate`.
      if (context?.previous) {
        queryClient.setQueryData(membersQueryKey, context.previous);
      }
      toast.error("Não foi possível remover o membro.");
    },
    onSettled: () => {
      // Reconcilia com o servidor independentemente de sucesso ou erro.
      void queryClient.invalidateQueries({ queryKey: membersQueryKey });
    },
  });
}
