import { create } from "zustand";

/**
 * Global client UI state (Zustand). Kept SSR-safe by holding no persisted or
 * browser-only values in its initial state — the server and the first client
 * render start identical. To persist a slice, wrap the initializer with
 * `persist(...)` from `zustand/middleware` and gate reads behind a mounted
 * flag to avoid hydration mismatches.
 */
interface AppState {
  /** Whether the desktop app-shell sidebar is expanded. Feeds `SidebarProvider`. */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
