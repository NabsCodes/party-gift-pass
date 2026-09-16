"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { api, SessionExpired, staffLoginPath } from "@/lib/browser-api";
import { formatLagosTime, type Guest } from "@/lib/guest";

export type RedemptionState =
  "review" | "confirmed" | "used" | "invalid" | "unavailable" | "uncertain";

export function useRedemption({
  token,
  guest,
  unavailable = false,
}: {
  token: string;
  guest: Guest | null;
  unavailable?: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState<RedemptionState>(
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
      const result = await api<{ outcome: RedemptionState; guest?: Guest }>(
        "/api/staff/redeem",
        "POST",
        { token, attemptId: attempt.current },
      );
      setState(result.outcome);
      if (result.guest) setCurrent(result.guest);
    } catch (error) {
      if (error instanceof SessionExpired) {
        router.push(staffLoginPath(`/redeem/${token}`));
        return;
      }
      setState("uncertain");
    } finally {
      setBusy(false);
    }
  }

  return {
    state,
    current,
    busy,
    confirm,
    time: formatLagosTime(current?.redeemedAt),
  };
}
