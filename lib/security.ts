import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
export function ticketToken(id: string, key: string) {
  return createHmac("sha256", key)
    .update(`party-gift-pass:v1:${id}`)
    .digest("base64url");
}
export function equalSecret(a: string, b: string) {
  return timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );
}
export function signSession(key: string, now = Date.now()) {
  const body = Buffer.from(
    JSON.stringify({ id: randomUUID(), exp: now + 12 * 60 * 60 * 1000 }),
  ).toString("base64url");
  return `${body}.${createHmac("sha256", key).update(body).digest("base64url")}`;
}
export function validSession(
  value: string | undefined,
  key: string,
  now = Date.now(),
) {
  if (!value || value.length > 512) return false;
  const [body, signature, extra] = value.split(".");
  if (!body || !signature || extra) return false;
  if (
    !equalSecret(
      signature,
      createHmac("sha256", key).update(body).digest("base64url"),
    )
  )
    return false;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    return (
      typeof payload.id === "string" &&
      typeof payload.exp === "number" &&
      payload.exp > now &&
      payload.exp <= now + 12 * 60 * 60 * 1000
    );
  } catch {
    return false;
  }
}
export function safeReturnPath(input: string | null | undefined) {
  if (input === "/staff") return input;
  return input && /^\/redeem\/[A-Za-z0-9_-]{43}$/.test(input)
    ? input
    : "/staff";
}
