import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function ApprovalGate({
  summary,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  onApprove,
  onReject,
  pending,
  children,
}: {
  /** one-line plain-language statement of what approving actually does */
  summary: string;
  approveLabel?: string;
  rejectLabel?: string;
  onApprove: () => void;
  onReject?: () => void;
  pending?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="mode-paper space-y-4 rounded-md border border-border p-5">
      {children}
      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">{summary}</p>
        <div className="flex gap-2">
          <Button disabled={pending} onClick={onApprove} className="min-w-[140px]">
            {approveLabel}
          </Button>
          {onReject && (
            <Button variant="outline" disabled={pending} onClick={onReject}>
              {rejectLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Full-width amber interrupt banner — architecture-change gate, per design.md §4.6 */
export function InterruptBanner({
  title,
  body,
  onApprove,
  onReject,
  pending,
}: {
  title: string;
  body: string;
  onApprove: () => void;
  onReject: () => void;
  pending?: boolean;
}) {
  return (
    <div className="quarantine-card mode-paper w-full space-y-3 p-5">
      <p className="text-sm font-medium text-[var(--flag-amber)]">{title}</p>
      <p className="text-sm text-foreground/90">{body}</p>
      <div className="flex gap-2">
        <Button disabled={pending} onClick={onApprove}>
          Approve
        </Button>
        <Button variant="outline" disabled={pending} onClick={onReject}>
          Reject
        </Button>
      </div>
    </div>
  );
}
