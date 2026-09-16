import { requireStaff } from "@/lib/auth";
import { findTicket, toGuest } from "@/lib/tickets";
import { Redemption } from "@/components/redemption";

export const dynamic = "force-dynamic";

export default async function Redeem({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  await requireStaff(`/redeem/${token}`);
  let guest = null;
  let unavailable = false;
  try {
    const row = await findTicket(token);
    guest = row ? toGuest(row) : null;
  } catch {
    unavailable = true;
  }
  return <Redemption token={token} guest={guest} unavailable={unavailable} />;
}
