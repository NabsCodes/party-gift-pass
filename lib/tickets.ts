import "server-only";
import { randomUUID } from "node:crypto";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { tickets, type Ticket } from "@/db/schema";
import { getConfig } from "./config";
import type { Guest } from "./guest";
import { duplicateGuestNames, nextNumberedGuest } from "./guest";
import { hashToken, ticketToken } from "./security";

export type { Guest } from "./guest";

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
      .orderBy(desc(tickets.createdAt), asc(tickets.batchIndex))
      .limit(5000)
  ).map(toGuest);
}
export class DuplicateGuestError extends Error {
  constructor(public readonly names: string[]) {
    super("Some guests are already on the list.");
    this.name = "DuplicateGuestError";
  }
}

export async function createGuests(
  names: string[],
  batchId: string,
  options: { numbered?: boolean } = {},
) {
  const db = await getDb();
  const existingBatch = await db
    .select()
    .from(tickets)
    .where(eq(tickets.batchId, batchId))
    .orderBy(asc(tickets.batchIndex));
  if (existingBatch.length) return existingBatch.map(toGuest);

  const existingNames = (
    await db.select({ displayLabel: tickets.displayLabel }).from(tickets)
  )
    .map((row) => row.displayLabel)
    .filter((name): name is string => Boolean(name));
  const labels = options.numbered
    ? names.map((_, index) => {
        const number = nextNumberedGuest(existingNames) + index;
        return `Guest ${String(number).padStart(3, "0")}`;
      })
    : names;
  if (!options.numbered) {
    const duplicates = duplicateGuestNames(existingNames, labels);
    if (duplicates.length)
      throw new DuplicateGuestError([...new Set(duplicates)]);
  }
  const batchCode = batchId.replaceAll("-", "").slice(0, 12).toUpperCase();
  const rows = labels.map((name, batchIndex) => {
    const id = randomUUID();
    return {
      id,
      batchId,
      batchIndex,
      displayLabel: name,
      ticketNumber: [
        "GP",
        batchCode,
        String(batchIndex + 1).padStart(3, "0"),
      ].join("-"),
      tokenHash: hashToken(ticketToken(id, getConfig().QR_SECRET)),
    };
  });
  await db
    .insert(tickets)
    .values(rows)
    .onConflictDoNothing({ target: [tickets.batchId, tickets.batchIndex] });
  return (
    await db
      .select()
      .from(tickets)
      .where(eq(tickets.batchId, batchId))
      .orderBy(asc(tickets.batchIndex))
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
