import { createFileRoute } from "@tanstack/react-router";
import { IssueList } from "@/features/issues/issue-list";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_app/issues")({
  component: MyIssues,
});

function MyIssues() {
  const { data: session } = authClient.useSession();
  return (
    <IssueList
      title="Minhas issues"
      description="Issues atribuídas a você."
      filters={{ assigneeId: session?.user.id }}
    />
  );
}
