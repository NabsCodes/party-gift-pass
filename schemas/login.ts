import { z } from "zod";

import { partyCopy } from "@/lib/copy";

export const loginSchema = z.object({
  passphrase: z
    .string()
    .trim()
    .min(1, partyCopy.desk.passphraseRequired)
    .max(256, "That passphrase is too long."),
});

export type LoginValues = z.infer<typeof loginSchema>;
