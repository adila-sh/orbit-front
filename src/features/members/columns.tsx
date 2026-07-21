import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, Trash2Icon } from "lucide-react";

import type { Member, MemberStatus } from "@/features/members/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_META: Record<
  MemberStatus,
  { label: string; variant: "secondary" | "outline" | "destructive" }
> = {
  active: { label: "Ativo", variant: "secondary" },
  invited: { label: "Convidado", variant: "outline" },
  suspended: { label: "Suspenso", variant: "destructive" },
};

interface MemberColumnsOptions {
  onRemove: (id: string) => void;
}

/**
 * Factory de colunas — recebe o handler de remoção da rota para que a coluna de
 * ações possa disparar a mutation. Deixe `memberColumns` como função em vez de
 * constante quando as células precisam de callbacks vindos do componente.
 */
export function memberColumns({ onRemove }: MemberColumnsOptions): ColumnDef<Member>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-2"
        >
          Nome
          <ArrowUpDownIcon />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("email")}</span>,
    },
    {
      accessorKey: "role",
      header: "Papel",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const meta = STATUS_META[row.getValue<MemberStatus>("status")];
        return <Badge variant={meta.variant}>{meta.label}</Badge>;
      },
    },
    {
      accessorKey: "lastActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-2"
        >
          Última atividade
          <ArrowUpDownIcon />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.getValue("lastActive")}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Remover ${row.original.name}`}
            className="text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(row.original.id)}
          >
            <Trash2Icon />
          </Button>
        </div>
      ),
    },
  ];
}
