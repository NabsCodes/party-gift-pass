import { LoginView } from "@/components/login/login-view";
import { isDemo } from "@/lib/config";
import { safeReturnPath } from "@/lib/security";

export const dynamic = "force-dynamic";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <LoginView next={safeReturnPath(next)} demo={isDemo()} />;
}
