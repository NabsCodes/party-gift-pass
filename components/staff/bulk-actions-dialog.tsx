"use client";

import { Check, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BulkActionsDialog({
  count,
  busy,
  onClose,
  onDownload,
  onMarkShared,
}: {
  count: number;
  busy: boolean;
  onClose: () => void;
  onDownload: () => void;
  onMarkShared: () => void;
}) {
  return (
    <div className="fixed inset-0 z-30 grid place-items-center p-4">
      <button
        type="button"
        className="bg-ink/60 absolute inset-0 cursor-default"
        aria-label="Close additional actions"
        disabled={busy}
        onClick={onClose}
      />
      <section
        className="bg-paper relative w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bulk-actions-title"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
          disabled={busy}
          aria-label="Close additional actions"
        >
          <X />
        </Button>
        <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          {count} selected pass{count === 1 ? "" : "es"}
        </p>
        <h2
          id="bulk-actions-title"
          className="font-display mt-2 text-[clamp(1.8rem,3vw,2.4rem)] leading-[0.95] uppercase"
        >
          Other actions
        </h2>
        <p className="text-muted mt-4 text-sm leading-relaxed">
          Sharing is the main workflow. Use these only when you need files or
          have already sent the selected passes.
        </p>
        <div className="mt-8 grid gap-2">
          <Button variant="secondary" disabled={busy} onClick={onDownload}>
            <Download /> Download images as ZIP
          </Button>
          <Button variant="outline" disabled={busy} onClick={onMarkShared}>
            <Check /> Mark selected as shared
          </Button>
        </div>
      </section>
    </div>
  );
}
