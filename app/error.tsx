"use client";

import { PartyFallback } from "@/components/layout/party-fallback";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PartyFallback
      code="!"
      eyebrow="Quick time-out"
      title="The match needs a moment."
      copy="We couldn’t finish that request. No gift was collected. Please try again, or return to the gift desk."
      onRetry={reset}
    />
  );
}
