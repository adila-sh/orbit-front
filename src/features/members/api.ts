import type { Member, MemberRole } from "@/features/members/mock";
import { MEMBERS } from "@/features/members/mock";

/**
 * API mock da feature — mantém uma lista em memória e simula latência de rede.
 * Num app real, troque cada função por uma chamada ao `apiClient` (Better Fetch),
 * tratando o tuple `{ data, error }`. Ex.:
 *
 *   export async function fetchMembers(): Promise<Member[]> {
 *     const { data, error } = await apiClient<Member[]>("/members");
 *     if (error) throw new Error(error.message ?? "Falha ao carregar membros");
 *     return data;
 *   }
 *
 * A forma das funções (Promise que resolve com dados ou rejeita em erro) é o que
 * o TanStack Query espera — por isso o mock também rejeita para exercitar os
 * estados de erro da UI.
 */

const LATENCY_MS = 500;

let store: Member[] = [...MEMBERS];

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

export interface InviteMemberInput {
  name: string;
  email: string;
  role: MemberRole;
}

export async function fetchMembers(): Promise<Member[]> {
  return delay([...store]);
}

export async function inviteMember(input: InviteMemberInput): Promise<Member> {
  if (store.some((member) => member.email === input.email)) {
    // Rejeita para demonstrar o tratamento de erro no `useMutation`.
    return Promise.reject(new Error("Já existe um membro com esse e-mail."));
  }

  const member: Member = {
    // `crypto.randomUUID` existe no browser e no Node 19+ — id estável só para o mock.
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    role: input.role,
    status: "invited",
    lastActive: "—",
  };

  store = [member, ...store];
  return delay(member);
}

export async function removeMember(id: string): Promise<{ id: string }> {
  store = store.filter((member) => member.id !== id);
  return delay({ id });
}
