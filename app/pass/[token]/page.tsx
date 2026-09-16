import type { Metadata } from "next";
import { GuestPass } from "@/components/pass/guest-pass";
import { guestPassView } from "@/lib/pass-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gift pass",
  robots: { index: false, follow: false },
};

export default async function Pass({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const view = await guestPassView(token);
  return <GuestPass valid={view.valid} qr={view.qr} />;
}
