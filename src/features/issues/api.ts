import { apiClient } from "@/lib/api";

export type IssueStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done" | "closed";
export type IssuePriority = "no_priority" | "low" | "medium" | "high" | "urgent";
export type IssueType = "epic" | "story" | "task" | "bug" | "improvement";

export interface Issue {
  id: string;
  projectId: string;
  number: number;
  identifier: string;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  assigneeId: string | null;
  creatorId: string;
  milestoneId: string | null;
  dueDate: string | null;
  estimate: number | null;
  rank: string;
  projectKey?: string;
  labels?: Label[];
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Activity {
  id: string;
  issueId: string;
  actorId: string | null;
  type: string;
  data: Record<string, unknown> | null;
  createdAt: string;
}

export interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueFilters {
  status?: IssueStatus;
  assigneeId?: string;
  q?: string;
}

interface Paginated<T> {
  data: T[];
  total: number;
}

function queryString(filters: IssueFilters) {
  const params = new URLSearchParams({ limit: "100" });
  if (filters.status) params.set("status", filters.status);
  if (filters.assigneeId) params.set("assigneeId", filters.assigneeId);
  if (filters.q) params.set("q", filters.q);
  return params.toString();
}

export async function fetchIssues(filters: IssueFilters = {}) {
  const { data, error } = await apiClient<Paginated<Issue>>(`/v1/issues?${queryString(filters)}`);
  if (error) throw new Error(error.message ?? "Não foi possível carregar as issues.");
  return data?.data ?? [];
}

export async function fetchIssue(issueId: string) {
  const { data, error } = await apiClient<Issue>(`/v1/issues/${issueId}`);
  if (error) throw new Error(error.message ?? "Não foi possível carregar a issue.");
  return data;
}

export async function fetchActivity(issueId: string) {
  const { data, error } = await apiClient<Activity[]>(`/v1/issues/${issueId}/activity`);
  if (error) throw new Error(error.message ?? "Não foi possível carregar a atividade.");
  return data ?? [];
}

export async function fetchComments(issueId: string) {
  const { data, error } = await apiClient<Comment[]>(`/v1/issues/${issueId}/comments`);
  if (error) throw new Error(error.message ?? "Não foi possível carregar os comentários.");
  return data ?? [];
}

export async function createComment(issueId: string, body: string) {
  const { data, error } = await apiClient<Comment>(`/v1/issues/${issueId}/comments`, {
    method: "POST",
    body: { body },
  });
  if (error) throw new Error(error.message ?? "Não foi possível publicar o comentário.");
  return data;
}
