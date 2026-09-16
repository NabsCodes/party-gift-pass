import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

loadEnv({ path: ".env.local", quiet: true });
loadEnv({ quiet: true });

// Neon pooled URLs are ideal for the application HTTP driver. Migrations use
// the direct connection when supplied, avoiding a pooler in schema operations.
const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  strict: true,
  verbose: true,
  ...(databaseUrl ? { dbCredentials: { url: databaseUrl } } : {}),
});
