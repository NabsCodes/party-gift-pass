import { z } from "zod";

export const loginSchema = z.object({
  passphrase: z
    .string()
    .trim()
    .min(1, "Enter the staff passphrase.")
    .max(256, "That passphrase is too long."),
});

export type LoginValues = z.infer<typeof loginSchema>;
