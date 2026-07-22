import { queryOptions } from "@tanstack/react-query";

import { fetchMilestones } from "@/features/milestones/api";

export const milestonesQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["orbit", "milestones", projectId] as const,
    queryFn: () => fetchMilestones(projectId),
  });
