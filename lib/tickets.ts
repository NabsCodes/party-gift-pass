import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { tickets, type Ticket } from "@/db/schema";
import { getConfig } from "./config";
import { hashToken, ticketToken } from "./security";
export type Guest = {
  id: string;
  name: string;
  number: string;
  status: "unused" | "redeemed";
  createdAt: string;
  redeemedAt: string | null;
  sharedAt: string | null;
  isDemo: boolean;
};
export function toGuest(row: Ticket): Guest {
  return {
    id: row.id,
    name: row.displayLabel || "Guest",
    number: row.ticketNumber,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    redeemedAt: row.redeemedAt?.toISOString() || null,
    sharedAt: row.sharedAt?.toISOString() || null,
    isDemo: row.isDemo,
  };
}
export async function listGuests() {
  return (
    await (
      await getDb()
    )
      .select()
      .from(tickets)
      .orderBy(desc(tickets.createdAt))
      .limit(5000)
  ).map(toGuest);
}
export async function createGuests(names: string[], batchId: string) {
  const db = await getDb();
  const rows = names.map((name, batchIndex) => {
    const id = randomUUID();
    return {
      id,
      batchId,
      batchIndex,
      displayLabel: name,
      ticketNumber: `PGP-${randomBytes(4).toString("hex").toUpperCase()}`,
      tokenHash: hashToken(ticketToken(id, getConfig().QR_SECRET)),
    };
  });
  await db
    .insert(tickets)
    .values(rows)
    .onConflictDoNothing({ target: [tickets.batchId, tickets.batchIndex] });
  return (
    await db.select().from(tickets).where(eq(tickets.batchId, batchId))
  ).map(toGuest);
}
export async function findTicket(token: string) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  return (
    (
      await (
        await getDb()
      )
        .select()
        .from(tickets)
        .where(eq(tickets.tokenHash, hashToken(token)))
        .limit(1)
    )[0] || null
  );
}
export async function confirmRedemption(token: string, attemptId: string) {
  const db = await getDb();
  const [won] = await db
    .update(tickets)
    .set({
      status: "redeemed",
      redeemedAt: sql`now()`,
      redemptionAttempt: attemptId,
    })
    .where(
      and(
        eq(tickets.tokenHash, hashToken(token)),
        eq(tickets.status, "unused"),
      ),
    )
    .returning();
  if (won) return { outcome: "confirmed" as const, guest: toGuest(won) };
  const row = await findTicket(token);
  if (!row) return { outcome: "invalid" as const };
  return {
    outcome:
      row.redemptionAttempt === attemptId
        ? ("confirmed" as const)
        : ("used" as const),
    guest: toGuest(row),
  };
}
