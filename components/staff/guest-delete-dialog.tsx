"use client";

import { useEffect } from "react";
import { Trash2, X } from "lucide-react";
import type { Guest } from "@/lib/guest";
import { Button } from "@/components/ui/button";

export function GuestDeleteDialog({
  guest,
  busy,
  onCancel,
  onConfirm,
}: {
  guest: Guest;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const kind = guest.isDemo ? "this sample" : "this unused guest";

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !busy) onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onCancel]);

  return (
    <div className="fixed inset-0 z-30 grid place-items-center p-4">
      <button
        type="button"
        className="bg-ink/60 absolute inset-0 cursor-default"
        aria-label="Keep guest"
        onClick={() => {
          if (!busy) onCancel();
        }}
      />
      <section
        className="bg-paper relative w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-guest-title"
        aria-describedby="delete-guest-copy"
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
          Cannot be undone
        </p>
        <h2
          id="delete-guest-title"
          className="font-display mt-2 text-[clamp(1.8rem,3vw,2.4rem)] leading-[0.95] uppercase"
        >
          Delete this pass?
        </h2>
        <p
          id="delete-guest-copy"
          className="text-muted mt-4 text-sm leading-relaxed"
        >
          Delete {kind} {guest.name}? The invitation link will stop working.
        </p>
        <div className="mt-8 flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={busy}
            onClick={onCancel}
          >
            Keep guest
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={busy}
            aria-busy={busy}
            onClick={onConfirm}
          >
            <Trash2 /> Delete guest
          </Button>
        </div>
      </section>
    </div>
  );
}
