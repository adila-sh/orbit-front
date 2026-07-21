import { beforeEach, describe, expect, it } from "vitest";

import { useAppStore } from "@/stores/app-store";

describe("useAppStore", () => {
  beforeEach(() => {
    // Zustand é um singleton de módulo — restaure o estado inicial entre testes.
    useAppStore.setState({ sidebarOpen: true });
  });

  it("alterna a sidebar", () => {
    // Act
    useAppStore.getState().toggleSidebar();

    // Assert
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it("define o estado da sidebar explicitamente", () => {
    // Act
    useAppStore.getState().setSidebarOpen(false);

    // Assert
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });
});
