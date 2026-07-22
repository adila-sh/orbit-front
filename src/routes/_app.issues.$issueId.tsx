import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { IssueDetailContent } from "@/features/issues/issue-detail-content";

export const Route = createFileRoute("/_app/issues/$issueId")({
  head: () => ({ meta: [{ title: "Issue · Adila Orbit" }] }),
  component: IssueDetail,
});

function IssueDetail() {
  const { issueId } = Route.useParams();
  return (
    <div className="space-y-6">
      <Link
        to="/issues"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Voltar para Minhas issues
      </Link>
      <IssueDetailContent issueId={issueId} />
    </div>
  );
}
