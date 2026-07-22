import { apiClient } from "@/lib/api";

export interface Project {
  id: string;
  key: string;
  name: string;
  icon: string | null;
  color: string | null;
  description: string | null;
  status: string;
}

interface Paginated<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await apiClient<Paginated<Project>>("/v1/projects?limit=100");
  if (error) throw new Error(error.message ?? "Não foi possível carregar os projetos.");
  return data?.data ?? [];
}

export async function fetchProject(projectId: string) {
  const { data, error } = await apiClient<Project>(`/v1/projects/${projectId}`);
  if (error) throw new Error(error.message ?? "Não foi possível carregar o projeto.");
  return data;
}
