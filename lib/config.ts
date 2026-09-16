import "server-only";
import { z } from "zod";

const configuration = z.object({
  APP_URL: z.url(),
  STAFF_PASSPHRASE: z.string().min(16).max(256),
  SESSION_SECRET: z.string().min(32),
  QR_SECRET: z.string().min(32),
});
export function isDemo() {
  return process.env.PARTY_DEMO === "1";
}
export function getConfig() {
  const local = isDemo();
  const parsed = configuration.safeParse(
    local
      ? {
          APP_URL: process.env.APP_URL || "http://localhost:3000",
          STAFF_PASSPHRASE: "party-demo-staff-pass",
          SESSION_SECRET: "local-demo-session-key-not-for-a-public-server-2026",
          QR_SECRET: "local-demo-qr-key-not-for-a-public-server-2026",
        }
      : process.env,
  );
  if (!parsed.success)
    throw new Error("Application configuration is incomplete.");
  const url = new URL(parsed.data.APP_URL);
  if (local && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    throw new Error("Demo mode is restricted to local development.");
  if (!local && url.protocol !== "https:")
    throw new Error("Live mode requires HTTPS.");
  return { ...parsed.data, APP_URL: url.origin, demo: local };
}
