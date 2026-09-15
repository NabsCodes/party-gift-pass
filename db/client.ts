import { drizzle } from "drizzle-orm/neon-http";

import { getServerEnv } from "@/lib/env";

import * as schema from "./schema";

const { DATABASE_URL } = getServerEnv();

export const db = drizzle(DATABASE_URL, { schema });
