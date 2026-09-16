import { requireStaff } from "@/lib/auth";
import { isDemo } from "@/lib/config";
import { Workspace } from "@/components/workspace";

export const dynamic = "force-dynamic";

export default async function Staff() {
  await requireStaff();
  return <Workspace demo={isDemo()} />;
}
