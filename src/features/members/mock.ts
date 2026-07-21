export type MemberRole = "Admin" | "Editor" | "Viewer";
export type MemberStatus = "active" | "invited" | "suspended";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  lastActive: string;
}

/** Dados de exemplo para a tabela — troque por um `useQuery` num app real. */
export const MEMBERS: readonly Member[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@adila.co",
    role: "Admin",
    status: "active",
    lastActive: "2026-07-11",
  },
  {
    id: "2",
    name: "Alan Turing",
    email: "alan@adila.co",
    role: "Editor",
    status: "active",
    lastActive: "2026-07-10",
  },
  {
    id: "3",
    name: "Grace Hopper",
    email: "grace@adila.co",
    role: "Editor",
    status: "invited",
    lastActive: "2026-07-08",
  },
  {
    id: "4",
    name: "Edsger Dijkstra",
    email: "edsger@adila.co",
    role: "Viewer",
    status: "suspended",
    lastActive: "2026-06-29",
  },
  {
    id: "5",
    name: "Margaret Hamilton",
    email: "margaret@adila.co",
    role: "Admin",
    status: "active",
    lastActive: "2026-07-11",
  },
  {
    id: "6",
    name: "Donald Knuth",
    email: "donald@adila.co",
    role: "Viewer",
    status: "invited",
    lastActive: "2026-07-02",
  },
];
