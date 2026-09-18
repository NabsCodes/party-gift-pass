"use client";

import { useEffect } from "react";
import { Check, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BulkConfirmDialog({
  kind,
  count,
  excluded,
  busy,
  onCancel,
  onConfirm,
}: {
  kind: "download" | "shared";
  count: number;
  excluded: number;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !busy) onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onCancel]);

  const downloading = kind === "download";
  return (
    <div className="fixed inset-0 z-30 grid place-items-center p-4">
      <button
        type="button"
        className="bg-ink/60 absolute inset-0 cursor-default"
        aria-label="Close dialog"
        onClick={() => {
          if (!busy) onCancel();
        }}
      />
      <section
        className="bg-paper relative w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="bulk-confirm-title"
        aria-describedby="bulk-confirm-copy"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          disabled={busy}
          onClick={onCancel}
          aria-label="Close"
        >
          <X />
        </Button>
        <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          {downloading ? "Large image export" : "Confirm your sending"}
        </p>
        <h2
          id="bulk-confirm-title"
          className="font-display mt-2 text-[clamp(1.8rem,3vw,2.4rem)] leading-[0.95] uppercase"
        >
          {downloading
            ? `Download ${count} passes?`
            : `Mark ${count} as shared?`}
        </h2>
        <p
          id="bulk-confirm-copy"
          className="text-muted mt-4 text-sm leading-relaxed"
        >
          {downloading
            ? "This prepares two images per pass in one ZIP. Use a laptop and keep this tab open while it finishes."
            : "Only confirm after you have actually sent these private passes."}
          {excluded
            ? ` ${excluded} collected pass${excluded === 1 ? " is" : "es are"} excluded.`
            : ""}
        </p>
        <div className="mt-8 flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={busy}
            onClick={onCancel}
          >
            Go back
          </Button>
          <Button
            type="button"
            disabled={busy}
            aria-busy={busy}
            onClick={onConfirm}
          >
            {downloading ? <Download /> : <Check />}
            {downloading ? "Download ZIP" : "I have sent them"}
          </Button>
        </div>
      </section>
    </div>
  );
}
