import { createFileRoute } from "@tanstack/react-router";
import { IssueList } from "@/features/issues/issue-list";

export const Route = createFileRoute("/_app/backlog")({
  component: () => (
    <IssueList
      title="Backlog"
      description="Issues que ainda aguardam execução."
      filters={{ status: "backlog" }}
    />
  ),
});
