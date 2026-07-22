import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

interface WorkspaceValue {
  organizationId: string | undefined;
  organizationName: string | undefined;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const activeOrganization = authClient.useActiveOrganization();
  const organizationId = activeOrganization.data?.id;
  const organizationName = activeOrganization.data?.name;

  useEffect(() => {
    if (organizationId) void queryClient.invalidateQueries({ queryKey: ["orbit"] });
  }, [organizationId, queryClient]);

  const value = useMemo(
    () => ({ organizationId, organizationName }),
    [organizationId, organizationName],
  );
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider.");
  return context;
}
