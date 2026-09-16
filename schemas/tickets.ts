import { z } from "zod";
export const guestName = z
  .string()
  .trim()
  .min(1, "Enter a child's name.")
  .max(80, "Keep names under 80 characters.")
  .refine(
    (value) => !/[\u0000-\u001f\u007f]/.test(value),
    "Use a single line for each name.",
  );
export const createBatchSchema = z.object({
  batchId: z.uuid(),
  names: z.array(guestName).min(1).max(250),
});
export const redeemSchema = z.object({
  token: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  attemptId: z.uuid(),
});
export const ticketUpdateSchema = z.object({
  name: guestName.optional(),
  shared: z.boolean().optional(),
});
