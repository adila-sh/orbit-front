import { queryOptions } from "@tanstack/react-query";

import {
  fetchActivity,
  fetchComments,
  fetchIssue,
  fetchIssues,
  type IssueFilters,
} from "@/features/issues/api";

export const issuesQueryOptions = (filters: IssueFilters = {}) =>
  queryOptions({
    queryKey: ["orbit", "issues", filters] as const,
    queryFn: () => fetchIssues(filters),
  });

export const issueQueryOptions = (issueId: string) =>
  queryOptions({
    queryKey: ["orbit", "issue", issueId] as const,
    queryFn: () => fetchIssue(issueId),
  });

export const activityQueryOptions = (issueId: string) =>
  queryOptions({
    queryKey: ["orbit", "issue", issueId, "activity"] as const,
    queryFn: () => fetchActivity(issueId),
  });

export const commentsQueryOptions = (issueId: string) =>
  queryOptions({
    queryKey: ["orbit", "issue", issueId, "comments"] as const,
    queryFn: () => fetchComments(issueId),
  });
