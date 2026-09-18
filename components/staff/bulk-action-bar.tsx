"use client";

import { MoreHorizontal, Send, X } from "lucide-react";
import type { StaffBusy } from "@/hooks/use-staff-workspace";
import { Button } from "@/components/ui/button";

export function BulkActionBar({
  count,
  matchingCount,
  collectedCount,
  busy,
  onSelectMatching,
  onClear,
  onShare,
  onMoreActions,
}: {
  count: number;
  matchingCount: number;
  collectedCount: number;
  busy: StaffBusy;
  onSelectMatching: () => void;
  onClear: () => void;
  onShare: () => void;
  onMoreActions: () => void;
}) {
  if (!count) return null;
  const readyCount = count - collectedCount;
  const locked = Boolean(busy);
  return (
    <section
      className="bg-ink px-gutter fixed inset-x-0 bottom-0 z-20 border-t border-white/20 py-3 text-white"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-320 flex-wrap items-center gap-2.5">
        <p className="mr-auto min-w-28 text-sm font-extrabold">
          <span className="text-yellow font-display mr-1 text-2xl">
            {count}
          </span>{" "}
          selected
        </p>
        {matchingCount > count && matchingCount <= 200 ? (
          <Button
            size="sm"
            variant="outline"
            className="border-white/45 text-white hover:bg-white/10"
            disabled={locked}
            onClick={onSelectMatching}
          >
            Select all {matchingCount} matching
          </Button>
        ) : null}
        <Button
          size="sm"
          className="bg-red hover:bg-red-dark"
          disabled={locked || !readyCount}
          aria-busy={busy === "bulk-queue"}
          onClick={onShare}
        >
          <Send /> Share selected
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-white/45 text-white hover:bg-white/10"
          disabled={locked || !readyCount}
          onClick={onMoreActions}
        >
          <MoreHorizontal /> More actions
        </Button>
        <Button
          size="iconSm"
          variant="ghost"
          className="text-white hover:bg-white/10"
          disabled={locked}
          onClick={onClear}
          aria-label="Clear selected passes"
        >
          <X />
        </Button>
      </div>
      {collectedCount ? (
        <p className="mx-auto mt-2 max-w-320 text-[0.65rem] font-bold text-[#d5d2ca]">
          {collectedCount} collected pass
          {collectedCount === 1 ? " is" : "es are"} excluded from sharing and
          downloads.
        </p>
      ) : null}
    </section>
  );
}
