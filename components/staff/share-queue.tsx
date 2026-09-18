"use client";

import { ExternalLink, Send, SkipForward, X } from "lucide-react";
import type { Guest, PassPayload } from "@/lib/guest";
import type { StaffBusy } from "@/hooks/use-staff-workspace";
import { passShareMessage } from "@/lib/event";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ShareQueue({
  guests,
  index,
  pass,
  busy,
  onClose,
  onShare,
  onMarkShared,
  onSkip,
}: {
  guests: Guest[];
  index: number;
  pass: PassPayload | null;
  busy: StaffBusy;
  onClose: () => void;
  onShare: (pass: PassPayload) => void;
  onMarkShared: (pass: PassPayload) => void;
  onSkip: () => void;
}) {
  const guest = guests[index];
  if (!guest) return null;
  const loading = !pass;
  const locked = Boolean(busy) || loading;
  const sharing = busy === "queue-share";
  const marking = busy === "bulk-mark";
  const skipping = busy === "queue-skip";
  return (
    <div className="bg-cream fixed inset-0 z-30 overflow-x-hidden overflow-y-auto">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <div className="min-w-0">
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Share selected passes
          </p>
          <p className="text-muted mt-1 text-xs font-bold">
            {index + 1} of {guests.length} · {guests.length - index - 1}{" "}
            remaining
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close selected passes"
        >
          <X />
        </Button>
      </header>
      <main className="px-gutter mx-auto grid w-full max-w-240 min-w-0 gap-10 py-[clamp(2rem,8vw,6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.7fr)] lg:items-center">
        <div className="min-w-0">
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            One family at a time
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.4rem,8vw,7rem)] leading-[0.88] tracking-[-0.045em] uppercase">
            Send one.
            <br />
            <i className="text-red not-italic">Then confirm it.</i>
          </h1>
          <p className="text-muted mt-6 max-w-lg text-sm leading-relaxed text-pretty">
            The private pass is loaded only for the family currently on screen.
            Send it, then record it only after it is actually sent.
          </p>
          <div className="border-ink mt-8 max-w-xl min-w-0 border-y py-5">
            <p className="text-muted text-[0.62rem] font-extrabold tracking-[0.12em] uppercase">
              Message preview
            </p>
            {pass ? (
              <div className="mt-3 grid min-w-0 gap-2 text-sm leading-relaxed">
                <p className="text-pretty">{passShareMessage(guest.name)}</p>
                <p className="text-muted break-all">{pass.passUrl}</p>
              </div>
            ) : (
              <p className="text-muted mt-3 flex items-center gap-2 text-sm">
                <Spinner className="size-4" /> Preparing this private pass…
              </p>
            )}
          </div>
        </div>
        <section className="bg-paper border-red min-w-0 border-t-4 p-[clamp(1.5rem,4vw,2.5rem)]">
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Next family
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,6vw,4.4rem)] leading-[0.9] break-words uppercase">
            {guest.name}
          </h2>
          <p className="text-muted mt-3 text-xs tracking-wide break-all">
            {guest.number}
          </p>
          <Button
            className="mt-8 w-full"
            disabled={locked}
            aria-busy={sharing}
            onClick={() => {
              if (pass) onShare(pass);
            }}
          >
            <Send /> Share pass
          </Button>
          <Button
            className="mt-2 w-full"
            variant="secondary"
            disabled={locked}
            onClick={() => {
              if (pass)
                window.open(pass.passUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <ExternalLink /> Open pass
          </Button>
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              variant="secondary"
              disabled={locked}
              aria-busy={marking}
              onClick={() => {
                if (pass) onMarkShared(pass);
              }}
            >
              Mark shared & next
            </Button>
            <Button
              variant="outline"
              disabled={locked}
              aria-busy={skipping}
              onClick={onSkip}
            >
              <SkipForward /> Skip
            </Button>
          </div>
          <p className="border-yellow text-muted mt-6 border-l-2 pl-3 text-[0.68rem] leading-5">
            Closing or cancelling the share sheet does not mark this pass as
            shared.
          </p>
        </section>
      </main>
    </div>
  );
}
