import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Global client UI preferences. The persist middleware keeps shell preferences
 * local to this browser without mixing them with server state.
 */
interface AppState {
  /** Whether the desktop app-shell sidebar is expanded. Feeds `SidebarProvider`. */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      sidebarWidth: 256,
      setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),
    }),
    {
      name: "orbit-ui-preferences",
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        sidebarWidth: state.sidebarWidth,
      }),
    },
  ),
);
