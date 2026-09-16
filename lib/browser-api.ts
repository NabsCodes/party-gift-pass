export class SessionExpired extends Error {}
export async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const response = await fetch(path, {
    method,
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  if (response.status === 401)
    throw new SessionExpired("Your session ended. Sign in to continue.");
  if (!response.ok)
    throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}
