import { queryOptions } from "@tanstack/react-query";

import { fetchMembers } from "@/features/members/api";

/** Chave de cache única da lista de membros — reusada por query e mutations. */
export const membersQueryKey = ["members"] as const;

/**
 * Definição reutilizável da query. Compartilhe entre um loader de rota
 * (`context.queryClient.ensureQueryData`) e componentes (`useQuery`) para manter
 * a chave de cache num só lugar.
 */
export const membersQueryOptions = queryOptions({
  queryKey: membersQueryKey,
  queryFn: fetchMembers,
});
