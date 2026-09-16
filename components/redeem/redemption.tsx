"use client";

import Link from "next/link";
import { ArrowLeft, Check, Gift, History, WifiOff, X } from "lucide-react";
import type { ReactNode } from "react";
import { Brand } from "@/components/layout/brand";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRedemption } from "@/hooks/use-redemption";
import type { Guest } from "@/lib/guest";
import { cn } from "@/lib/utils";

export function Redemption({
  token,
  guest,
  unavailable = false,
}: {
  token: string;
  guest: Guest | null;
  unavailable?: boolean;
}) {
  const { state, current, busy, confirm, time } = useRedemption({
    token,
    guest,
    unavailable,
  });

  return (
    <main className="bg-cream min-h-dvh">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand />
        <span className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Gift table
        </span>
      </header>
      <section
        className="mx-auto w-[min(38rem,calc(100%-2rem))] py-[clamp(2.3rem,8vw,6rem)] pb-16 text-center"
        aria-live="polite"
      >
        <Link
          className="text-muted mb-12 inline-flex items-center gap-1.5 text-xs font-extrabold"
          href="/staff"
        >
          <ArrowLeft size={16} /> Guest list
        </Link>
        {state === "review" ? (
          <Review current={current} busy={busy} confirm={confirm} />
        ) : state === "confirmed" ? (
          <Confirmed current={current} time={time} />
        ) : state === "used" ? (
          <Used current={current} time={time} />
        ) : state === "invalid" ? (
          <Invalid />
        ) : (
          <Hold
            uncertain={state === "uncertain"}
            busy={busy}
            confirm={confirm}
          />
        )}
      </section>
      <footer className="px-gutter text-muted flex justify-center gap-2.5 py-5 text-center text-[0.63rem] font-extrabold tracking-[0.13em] uppercase">
        Staff confirms. Kid smiles. <span className="text-red">✳</span> Aadil’s
        Matchday
      </footer>
    </main>
  );
}

function RoundIcon({ children }: { children: ReactNode }) {
  return (
    <span className="bg-red mx-auto mb-6 grid size-[4.2rem] place-items-center rounded-full text-white">
      {children}
    </span>
  );
}

function Review({
  current,
  busy,
  confirm,
}: {
  current: Guest | null;
  busy: boolean;
  confirm: () => void;
}) {
  return (
    <>
      <RoundIcon>
        <Gift />
      </RoundIcon>
      <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
        A gift with their name on it
      </p>
      <h1 className="font-display mt-3 text-[clamp(3rem,10vw,5.5rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase">
        Here for
        <br />
        the good stuff.
      </h1>
      <div className="border-ink mx-auto my-8 flex max-w-xs flex-col items-center gap-3 border-y py-6">
        <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Guest
        </p>
        <h2 className="font-display text-3xl uppercase">{current?.name}</h2>
        <span className="text-muted text-xs">{current?.number}</span>
        <span className="inline-flex rounded-full bg-[#e5ddd0] px-3 py-1.5 text-[0.59rem] font-extrabold tracking-wide text-[#5b554d] uppercase">
          Ready to collect
        </span>
      </div>
      <p className="text-muted mb-6 text-sm leading-relaxed">
        Check the child’s name. Confirm below, then hand over the gift when the
        green receipt appears.
      </p>
      <Button size="wide" disabled={busy} aria-busy={busy} onClick={confirm}>
        {busy ? "Confirming…" : "Confirm gift collected"}
        <Gift />
      </Button>
    </>
  );
}

function Confirmed({ current, time }: { current: Guest | null; time: string }) {
  return (
    <>
      <RoundIcon>
        <Check />
      </RoundIcon>
      <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
        Collection confirmed
      </p>
      <h1 className="font-display mt-3 text-[clamp(3rem,10vw,5.5rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase">
        One gift.
        <br />
        One big smile.
      </h1>
      <div className="bg-green mx-auto my-8 px-6 py-6 text-white">
        <strong className="block">
          Hand over one gift to {current?.name}.
        </strong>
        <span className="text-sm text-[#cee6dc]">
          {current?.number} · {time}
        </span>
      </div>
      <p className="text-muted mb-6 text-sm leading-relaxed">
        This confirmation is recorded. Don’t hand out another gift from this
        same receipt.
      </p>
      <Link className={cn(buttonVariants({ size: "wide" }))} href="/staff">
        Back to the guest list
        <ArrowLeft />
      </Link>
      <p className="text-muted mt-4 text-xs">
        For the next guest, reopen your phone’s camera.
      </p>
    </>
  );
}

function Used({ current, time }: { current: Guest | null; time: string }) {
  return (
    <>
      <RoundIcon>
        <History />
      </RoundIcon>
      <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
        Already collected
      </p>
      <h1 className="font-display mt-3 text-[clamp(3rem,10vw,5.5rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase">
        This gift has
        <br />
        left the bench.
      </h1>
      <div className="mx-auto my-8 max-w-xs">
        <h2 className="font-display text-3xl uppercase">{current?.name}</h2>
        <span className="text-muted text-xs">
          {current?.number} · {time}
        </span>
      </div>
      <p className="text-muted text-sm leading-relaxed">
        Do not hand out another gift. Ask the organiser to resolve any
        disagreement.
      </p>
    </>
  );
}

function Invalid() {
  return (
    <>
      <RoundIcon>
        <X />
      </RoundIcon>
      <h1 className="font-display mt-3 text-[clamp(3rem,10vw,5.5rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase">
        Pass not
        <br />
        recognised.
      </h1>
      <p className="text-muted mt-6 text-sm leading-relaxed">
        Check the QR or ask the organiser to find the guest. No collection was
        recorded by this request.
      </p>
    </>
  );
}

function Hold({
  uncertain,
  busy,
  confirm,
}: {
  uncertain: boolean;
  busy: boolean;
  confirm: () => void;
}) {
  return (
    <>
      <RoundIcon>
        <WifiOff />
      </RoundIcon>
      <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
        Please hold the gift
      </p>
      <h1 className="font-display mt-3 text-[clamp(3rem,10vw,5.5rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase">
        Let’s check
        <br />
        that again.
      </h1>
      <p className="text-muted my-6 text-sm leading-relaxed">
        {uncertain
          ? "Your confirmation may have reached us, but the reply was lost. Retry the same confirmation to find its result."
          : "We couldn’t check the ticket. Reconnect before handing over a gift."}
      </p>
      <Button
        size="wide"
        disabled={busy}
        aria-busy={busy}
        onClick={uncertain ? confirm : () => window.location.reload()}
      >
        {busy ? "Checking…" : "Check again"}
      </Button>
    </>
  );
}
