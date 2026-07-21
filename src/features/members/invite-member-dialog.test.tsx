import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as api from "@/features/members/api";
import { InviteMemberDialog } from "@/features/members/invite-member-dialog";
import { renderWithProviders } from "@/test/utils";

// Isola o componente da API mock — resolvemos na hora para exercitar o onSuccess.
vi.mock("@/features/members/api", () => ({
  inviteMember: vi.fn().mockResolvedValue({
    id: "new",
    name: "Nova Pessoa",
    email: "nova@adila.co",
    role: "Editor",
    status: "invited",
    lastActive: "—",
  }),
  removeMember: vi.fn(),
  fetchMembers: vi.fn().mockResolvedValue([]),
}));

describe("InviteMemberDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("bloqueia o envio e mostra erros de validação quando o form está vazio", async () => {
    const user = userEvent.setup();
    renderWithProviders(<InviteMemberDialog />);

    await user.click(screen.getByRole("button", { name: /convidar/i }));
    await user.click(screen.getByRole("button", { name: /enviar convite/i }));

    expect(await screen.findByText("Informe pelo menos 2 caracteres.")).toBeInTheDocument();
    expect(screen.getByText("E-mail inválido.")).toBeInTheDocument();
    expect(api.inviteMember).not.toHaveBeenCalled();
  });

  it("chama a mutation com os dados quando o form é válido", async () => {
    const user = userEvent.setup();
    renderWithProviders(<InviteMemberDialog />);

    await user.click(screen.getByRole("button", { name: /convidar/i }));
    await user.type(screen.getByLabelText("Nome"), "Nova Pessoa");
    await user.type(screen.getByLabelText("E-mail"), "nova@adila.co");
    await user.click(screen.getByRole("button", { name: /enviar convite/i }));

    await waitFor(() =>
      expect(api.inviteMember).toHaveBeenCalledWith({
        name: "Nova Pessoa",
        email: "nova@adila.co",
        role: "Editor",
      }),
    );
  });
});
