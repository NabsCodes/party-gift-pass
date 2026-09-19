import type { Metadata } from "next";
import { PartyFallback } from "@/components/layout/party-fallback";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PartyFallback
      code="404"
      eyebrow="Wrong turn"
      title="This page isn’t on the team."
      copy="The link may be incomplete or no longer available. No gift pass or collection was changed."
    />
  );
}
