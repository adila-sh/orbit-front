import { apiClient } from "@/lib/api";

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  dueDate: string | null;
  status: string;
}

export async function fetchMilestones(projectId: string) {
  const { data, error } = await apiClient<Milestone[]>(`/v1/projects/${projectId}/milestones`);
  if (error) throw new Error(error.message ?? "Não foi possível carregar os milestones.");
  return data ?? [];
}
