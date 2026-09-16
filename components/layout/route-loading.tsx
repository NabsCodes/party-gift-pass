import { Spinner } from "@/components/ui/spinner";

export function RouteLoading({ label }: { label: string }) {
  return (
    <div
      className="grid justify-items-center gap-4 px-6 py-16"
      role="status"
      aria-live="polite"
    >
      <Spinner className="text-red size-8" />
      <p className="text-muted text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
        {label}
      </p>
    </div>
  );
}
