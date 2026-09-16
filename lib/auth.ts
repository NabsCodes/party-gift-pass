import "server-only";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getConfig } from "./config";
import { safeReturnPath, validSession } from "./security";
export const SESSION_COOKIE = "party-staff";
export async function hasSession() {
  const config = getConfig();
  if (
    config.demo &&
    !/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(
      (await headers()).get("host") || "",
    )
  )
    return false;
  return validSession(
    (await cookies()).get(SESSION_COOKIE)?.value,
    config.SESSION_SECRET,
  );
}
export async function requireStaff(returnTo = "/staff") {
  if (!(await hasSession()))
    redirect(
      `/staff/login?next=${encodeURIComponent(safeReturnPath(returnTo))}`,
    );
}
