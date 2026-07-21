import { queryOptions } from "@tanstack/react-query";

import { fetchProject, fetchProjects } from "@/features/workspace/api";

export const projectsQueryOptions = queryOptions({
  queryKey: ["orbit", "projects"] as const,
  queryFn: fetchProjects,
});

export const projectQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["orbit", "project", projectId] as const,
    queryFn: () => fetchProject(projectId),
  });
