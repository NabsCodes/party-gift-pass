import "server-only";
import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/db/client";
import { tickets } from "@/db/schema";
import { getConfig } from "@/lib/config";
import { hashToken, ticketToken } from "@/lib/security";
import { toGuest } from "@/lib/tickets";

export async function getBulkPasses(ids: string[]) {
  const db = await getDb();
  const config = getConfig();
  const rows = await db.select().from(tickets).where(inArray(tickets.id, ids));
  const passes = rows.flatMap((row) => {
    if (row.status === "redeemed") return [];
    const token = ticketToken(row.id, config.QR_SECRET);
    if (hashToken(token) !== row.tokenHash) return [];
    return [
      {
        guest: toGuest(row),
        token,
        url: `${config.APP_URL}/redeem/${token}`,
        passUrl: `${config.APP_URL}/pass/${token}`,
      },
    ];
  });
  const returnedIds = new Set(passes.map((pass) => pass.guest.id));
  return {
    passes: ids.flatMap((id) => passes.filter((pass) => pass.guest.id === id)),
    skippedIds: ids.filter((id) => !returnedIds.has(id)),
  };
}

export async function markBulkShared(ids: string[]) {
  const updated = await (
    await getDb()
  )
    .update(tickets)
    .set({ sharedAt: new Date() })
    .where(and(inArray(tickets.id, ids), eq(tickets.status, "unused")))
    .returning();
  const updatedIds = new Set(updated.map((row) => row.id));
  return {
    updatedIds: updated.map((row) => row.id),
    skippedIds: ids.filter((id) => !updatedIds.has(id)),
  };
}
