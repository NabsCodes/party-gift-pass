import { z } from "zod";

const databaseUrl = z
  .string()
  .trim()
  .min(1)
  .superRefine((value, context) => {
    try {
      const url = new URL(value);

      if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
        context.addIssue({
          code: "custom",
          message: "DATABASE_URL must use the postgres or postgresql protocol.",
        });
      }
    } catch {
      context.addIssue({
        code: "custom",
        message: "DATABASE_URL must be a valid PostgreSQL connection URL.",
      });
    }
  });

export const serverEnvSchema = z.object({
  DATABASE_URL: databaseUrl,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
