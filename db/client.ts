import "server-only";
import { drizzle as neonDrizzle } from "drizzle-orm/neon-http";
import { drizzle as localDrizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { PGlite } from "@electric-sql/pglite";
import { eq } from "drizzle-orm";
import { getServerEnv } from "@/lib/env";
import { getConfig } from "@/lib/config";
import { hashToken, ticketToken } from "@/lib/security";
import * as schema from "./schema";

async function connect() {
  const config = getConfig();
  if (!config.demo) return neonDrizzle(getServerEnv().DATABASE_URL, { schema });
  const client = new PGlite(process.env.DEMO_DATA_DIR || ".party-demo");
  const db = localDrizzle(client, { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  const seeded = await db
    .select()
    .from(schema.appState)
    .where(eq(schema.appState.key, "demo-seeded"));
  if (!seeded.length) {
    await db.transaction(async (tx) => {
      for (const [i, name] of [
        "Adil Lawal",
        "Zara Bello",
        "Tobi Okafor",
        "Amara Yusuf",
        "Zainab Musa",
      ].entries()) {
        const id = `00000000-0000-4000-8000-${String(i + 1).padStart(12, "0")}`;
        await tx
          .insert(schema.tickets)
          .values({
            id,
            displayLabel: name,
            ticketNumber: `DEMO-00${i + 1}`,
            isDemo: true,
            tokenHash: hashToken(ticketToken(id, config.QR_SECRET)),
          })
          .onConflictDoNothing();
      }
      await tx
        .insert(schema.appState)
        .values({ key: "demo-seeded", value: "yes" })
        .onConflictDoNothing();
    });
  }
  return db;
}
const globalDb = globalThis as unknown as {
  partyDb?: ReturnType<typeof connect>;
};
export function getDb() {
  globalDb.partyDb ??= connect().catch((error) => {
    globalDb.partyDb = undefined;
    throw error;
  });
  return globalDb.partyDb;
}
