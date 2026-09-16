"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowLeft, Check, Gift, History, WifiOff, X } from "lucide-react";
import { Brand } from "./brand";
import { api, SessionExpired } from "@/lib/browser-api";
import type { Guest } from "@/lib/tickets";
export function Redemption({
  token,
  guest,
  unavailable = false,
}: {
  token: string;
  guest: Guest | null;
  unavailable?: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState(
    unavailable
      ? "unavailable"
      : !guest
        ? "invalid"
        : guest.status === "redeemed"
          ? "used"
          : "review",
  );
  const [current, setCurrent] = useState(guest);
  const [busy, setBusy] = useState(false);
  const attempt = useRef<string | null>(null);
  async function confirm() {
    if (busy) return;
    setBusy(true);
    try {
      attempt.current ??=
        sessionStorage.getItem(`attempt:${token}`) || crypto.randomUUID();
      sessionStorage.setItem(`attempt:${token}`, attempt.current);
      const result = await api<{ outcome: string; guest?: Guest }>(
        "/api/staff/redeem",
        "POST",
        { token, attemptId: attempt.current },
      );
      setState(result.outcome);
      if (result.guest) setCurrent(result.guest);
    } catch (error) {
      if (error instanceof SessionExpired) {
        router.push(
          `/staff/login?next=${encodeURIComponent(`/redeem/${token}`)}`,
        );
        return;
      }
      setState("uncertain");
    } finally {
      setBusy(false);
    }
  }
  const time = current?.redeemedAt
    ? new Intl.DateTimeFormat("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Africa/Lagos",
      }).format(new Date(current.redeemedAt))
    : "";
  return (
    <main className="redeem-page">
      <header className="topbar">
        <Brand />
        <span className="eyebrow">GIFT TABLE</span>
      </header>
      <section className={`redemption ${state}`} aria-live="polite">
        <Link className="back-link" href="/staff">
          <ArrowLeft size={16} /> Guest list
        </Link>
        {state === "review" ? (
          <>
            <span className="round-icon">
              <Gift />
            </span>
            <span className="eyebrow">A GIFT WITH THEIR NAME ON IT</span>
            <h1>
              Here for
              <br />
              the good stuff.
            </h1>
            <div className="identity">
              <span className="eyebrow">GUEST</span>
              <h2>{current?.name}</h2>
              <span>{current?.number}</span>
              <span className="status unused">Ready to collect</span>
            </div>
            <p>
              Check the child’s name. Confirm below, then hand over the gift
              when the green receipt appears.
            </p>
            <button
              className="button primary wide"
              disabled={busy}
              onClick={confirm}
            >
              {busy ? "Confirming…" : "Confirm gift collected"}
              <Gift size={18} />
            </button>
          </>
        ) : state === "confirmed" ? (
          <>
            <span className="round-icon">
              <Check />
            </span>
            <span className="eyebrow">COLLECTION CONFIRMED</span>
            <h1>
              One gift.
              <br />
              One big smile.
            </h1>
            <div className="receipt">
              <strong>Hand over one gift to {current?.name}.</strong>
              <span>
                {current?.number} · {time}
              </span>
            </div>
            <p>
              This confirmation is recorded. Don’t hand out another gift from
              this same receipt.
            </p>
            <Link className="button primary wide" href="/staff">
              Back to the guest list
              <ArrowLeft size={18} />
            </Link>
            <p className="muted">
              For the next guest, reopen your phone’s camera.
            </p>
          </>
        ) : state === "used" ? (
          <>
            <span className="round-icon">
              <History />
            </span>
            <span className="eyebrow">ALREADY COLLECTED</span>
            <h1>
              This gift has
              <br />
              left the bench.
            </h1>
            <div className="identity">
              <h2>{current?.name}</h2>
              <span>
                {current?.number} · {time}
              </span>
            </div>
            <p>
              Do not hand out another gift. Ask the organiser to resolve any
              disagreement.
            </p>
          </>
        ) : state === "invalid" ? (
          <>
            <span className="round-icon">
              <X />
            </span>
            <h1>
              Pass not
              <br />
              recognised.
            </h1>
            <p>
              Check the QR or ask the organiser to find the guest. No collection
              was recorded by this request.
            </p>
          </>
        ) : (
          <>
            <span className="round-icon">
              <WifiOff />
            </span>
            <span className="eyebrow">PLEASE HOLD THE GIFT</span>
            <h1>
              Let’s check
              <br />
              that again.
            </h1>
            <p>
              {state === "uncertain"
                ? "Your confirmation may have reached us, but the reply was lost. Retry the same confirmation to find its result."
                : "We couldn’t check the ticket. Reconnect before handing over a gift."}
            </p>
            <button
              className="button primary wide"
              disabled={busy}
              onClick={
                state === "uncertain" ? confirm : () => window.location.reload()
              }
            >
              {busy ? "Checking…" : "Check again"}
            </button>
          </>
        )}
      </section>
      <footer className="page-foot">
        STAFF CONFIRMS. KID SMILES. <span>✳</span> AADIL’S MATCHDAY
      </footer>
    </main>
  );
}
