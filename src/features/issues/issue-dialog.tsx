import { useQuery } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IssueDetailContent } from "@/features/issues/issue-detail-content";
import { issueQueryOptions } from "@/features/issues/queries";

/**
 * Jira-style modal that shows the full issue detail. Driven by an `issueId`
 * from the parent; passing `null` keeps it closed.
 */
export function IssueDialog({
  issueId,
  onOpenChange,
}: {
  issueId: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={issueId !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto">
        {issueId !== null && <IssueDialogBody issueId={issueId} />}
      </DialogContent>
    </Dialog>
  );
}

function IssueDialogBody({ issueId }: { issueId: string }) {
  const issue = useQuery(issueQueryOptions(issueId));
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex flex-wrap items-baseline gap-2">
          {issue.data ? (
            <>
              <span className="font-mono text-sm font-normal text-muted-foreground">
                {issue.data.identifier}
              </span>
              <span>{issue.data.title}</span>
            </>
          ) : (
            "Detalhes da issue"
          )}
        </DialogTitle>
        <DialogDescription>Detalhes, dependências, comentários e atividade.</DialogDescription>
      </DialogHeader>
      <IssueDetailContent issueId={issueId} hideHeader />
    </>
  );
}
