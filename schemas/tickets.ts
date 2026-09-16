import { z } from "zod";
import { MAX_BATCH_SIZE } from "@/lib/guest";

export const guestName = z
  .string()
  .trim()
  .min(1, "Enter a child's name.")
  .max(80, "Keep names under 80 characters.")
  .refine(
    (value) => !/[\u0000-\u001f\u007f]/.test(value),
    "Use a single line for each name.",
  );

export const createBatchSchema = z
  .object({
    batchId: z.uuid(),
    names: z.array(guestName).min(1).max(MAX_BATCH_SIZE).optional(),
    quantity: z.number().int().min(1).max(MAX_BATCH_SIZE).optional(),
  })
  .refine(
    (value) =>
      Number(value.names !== undefined) +
        Number(value.quantity !== undefined) ===
      1,
    "Choose either numbered passes or a list of names.",
  );

export const numberedBatchFormSchema = z.object({
  quantity: z.coerce
    .number({ error: "Enter how many passes." })
    .int("Use a whole number.")
    .min(1, "Create at least 1 pass.")
    .max(MAX_BATCH_SIZE, `Cap is ${MAX_BATCH_SIZE} passes per batch.`),
});

export const namedBatchFormSchema = z.object({
  names: z.string().superRefine((value, context) => {
    const clean = value
      .split("\n")
      .map((name) => name.trim())
      .filter(Boolean);
    if (!clean.length) {
      context.addIssue({
        code: "custom",
        message: "Add at least one name.",
      });
      return;
    }
    if (clean.length > MAX_BATCH_SIZE) {
      context.addIssue({
        code: "custom",
        message: `Cap is ${MAX_BATCH_SIZE} names per batch.`,
      });
      return;
    }
    for (const name of clean) {
      const parsed = guestName.safeParse(name);
      if (!parsed.success) {
        context.addIssue({
          code: "custom",
          message: parsed.error.issues[0]?.message ?? "Check the names.",
        });
        return;
      }
    }
  }),
});

export function parseNameList(value: string) {
  return value
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean);
}

export const redeemSchema = z.object({
  token: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  attemptId: z.uuid(),
});
export const ticketUpdateSchema = z.object({
  name: guestName.optional(),
  shared: z.boolean().optional(),
});
