import "server-only";
import QRCode from "qrcode";
import { getConfig } from "./config";
import { findTicket } from "./tickets";

export async function guestPassView(token: string) {
  const row = await findTicket(token);
  if (!row) return { valid: false as const, qr: null };
  const qr = await QRCode.toDataURL(`${getConfig().APP_URL}/redeem/${token}`, {
    width: 480,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#17241fff", light: "#ffffffff" },
  });
  return { valid: true as const, qr };
}
