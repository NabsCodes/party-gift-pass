import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db/client";
import { tickets } from "@/db/schema";
import { hasSession } from "@/lib/auth";
import { getConfig } from "@/lib/config";
import { ticketToken, hashToken } from "@/lib/security";
import {
  confirmRedemption,
  createGuests,
  listGuests,
  toGuest,
} from "@/lib/tickets";
import {
  createBatchSchema,
  redeemSchema,
  ticketUpdateSchema,
} from "@/schemas/tickets";
async function handle(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    const config = getConfig();
    if (!(await hasSession()))
      return Response.json(
        { error: "Your session has ended. Sign in again." },
        { status: 401 },
      );
    if (
      request.method !== "GET" &&
      request.headers.get("origin") !== config.APP_URL
    )
      return Response.json(
        { error: "Request origin not allowed." },
        { status: 403 },
      );
    const { path } = await context.params;
    const route = path.join("/");
    const reply = (value: unknown, status = 200) =>
      Response.json(value, {
        status,
        headers: {
          "Cache-Control": "private, no-store",
          "Referrer-Policy": "no-referrer",
        },
      });
    let body: unknown = {};
    if (request.method === "POST" || request.method === "PATCH") {
      if (Number(request.headers.get("content-length") || 0) > 40000)
        return reply({ error: "This batch is too large." }, 413);
      const text = await request.text();
      if (text.length > 40000)
        return reply({ error: "This batch is too large." }, 413);
      body = JSON.parse(text);
    }
    if (route === "tickets" && request.method === "GET")
      return reply({ guests: await listGuests() });
    if (route === "tickets" && request.method === "POST") {
      const input = createBatchSchema.parse(body);
      const names =
        input.names ??
        Array.from(
          { length: input.quantity ?? 0 },
          (_, index) => `Guest ${String(index + 1).padStart(3, "0")}`,
        );
      return reply({ guests: await createGuests(names, input.batchId) });
    }
    if (route === "redeem" && request.method === "POST") {
      const input = redeemSchema.parse(body);
      return reply(await confirmRedemption(input.token, input.attemptId));
    }
    const db = await getDb();
    if (route === "demo" && request.method === "DELETE") {
      const removed = await db
        .delete(tickets)
        .where(eq(tickets.isDemo, true))
        .returning();
      return reply({ removed: removed.length });
    }
    if (path[0] === "tickets" && z.uuid().safeParse(path[1]).success) {
      const [row] = await db
        .select()
        .from(tickets)
        .where(eq(tickets.id, path[1]))
        .limit(1);
      if (!row) return reply({ error: "That guest no longer exists." }, 404);
      if (path[2] === "pass" && request.method === "GET") {
        const token = ticketToken(row.id, config.QR_SECRET);
        if (hashToken(token) !== row.tokenHash)
          return reply(
            {
              error:
                "This pass cannot be regenerated. Ask the organiser to check the QR key.",
            },
            409,
          );
        return reply({
          guest: toGuest(row),
          token,
          url: `${config.APP_URL}/redeem/${token}`,
          passUrl: `${config.APP_URL}/pass/${token}`,
        });
      }
      if (path.length === 2 && request.method === "PATCH") {
        const input = ticketUpdateSchema.parse(body);
        if (row.status === "redeemed" && input.name !== undefined)
          return reply(
            { error: "Collected guest records cannot be renamed." },
            409,
          );
        await db
          .update(tickets)
          .set({
            ...(input.name !== undefined ? { displayLabel: input.name } : {}),
            ...(input.shared !== undefined
              ? { sharedAt: input.shared ? new Date() : null }
              : {}),
          })
          .where(
            and(
              eq(tickets.id, row.id),
              input.name !== undefined
                ? eq(tickets.status, "unused")
                : eq(tickets.id, row.id),
            ),
          );
        return reply({ ok: true });
      }
      if (path.length === 2 && request.method === "DELETE") {
        const removed = await db
          .delete(tickets)
          .where(
            and(
              eq(tickets.id, row.id),
              row.isDemo
                ? eq(tickets.isDemo, true)
                : eq(tickets.status, "unused"),
            ),
          )
          .returning();
        return reply(
          removed.length
            ? { ok: true }
            : { error: "Collected guest records are retained." },
          removed.length ? 200 : 409,
        );
      }
    }
    return reply({ error: "Not found." }, 404);
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError)
      return Response.json(
        {
          error:
            "Choose 1–250 numbered passes or enter 1–250 names, one per line.",
        },
        { status: 400 },
      );
    return Response.json(
      {
        error:
          "Could not reach the party database. Check your connection and try again.",
      },
      { status: 503 },
    );
  }
}
export { handle as GET, handle as POST, handle as PATCH, handle as DELETE };
