import { cookies } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { loginWindows } from "@/db/schema";
import { getConfig } from "@/lib/config";
import { equalSecret, signSession } from "@/lib/security";
import { SESSION_COOKIE } from "@/lib/auth";
export async function POST(request: Request) {
  try {
    const config = getConfig();
    if (request.headers.get("origin") !== config.APP_URL)
      return Response.json(
        { error: "Request origin not allowed." },
        { status: 403 },
      );
    if (Number(request.headers.get("content-length") || 0) > 2048)
      return Response.json({ error: "Request too large." }, { status: 413 });
    const text = await request.text();
    if (text.length > 2048)
      return Response.json({ error: "Request too large." }, { status: 413 });
    const body = JSON.parse(text);
    const db = await getDb();
    const window = String(Math.floor(Date.now() / (15 * 60 * 1000)));
    const [attempt] = await db
      .insert(loginWindows)
      .values({
        key: window,
        attempts: 1,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      })
      .onConflictDoUpdate({
        target: loginWindows.key,
        set: { attempts: sql`${loginWindows.attempts} + 1` },
      })
      .returning();
    if (attempt.attempts > 30)
      return Response.json(
        { error: "Too many attempts. Try again in 15 minutes." },
        { status: 429 },
      );
    if (
      typeof body.passphrase !== "string" ||
      !equalSecret(body.passphrase, config.STAFF_PASSPHRASE)
    )
      return Response.json(
        { error: "That passphrase isn't correct." },
        { status: 401 },
      );
    await db.delete(loginWindows).where(eq(loginWindows.key, window));
    (await cookies()).set(SESSION_COOKIE, signSession(config.SESSION_SECRET), {
      httpOnly: true,
      secure: !config.demo,
      sameSite: "lax",
      path: "/",
      maxAge: 12 * 60 * 60,
    });
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Staff access is temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }
}
export async function DELETE(request: Request) {
  if (request.headers.get("origin") !== getConfig().APP_URL)
    return Response.json(
      { error: "Request origin not allowed." },
      { status: 403 },
    );
  (await cookies()).delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
