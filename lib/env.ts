import { serverEnvSchema, type ServerEnv } from "@/schemas/env";

export function parseServerEnv(
  environment: Record<string, string | undefined>,
): ServerEnv {
  return serverEnvSchema.parse(environment);
}

export function getServerEnv(): ServerEnv {
  return parseServerEnv(process.env);
}
