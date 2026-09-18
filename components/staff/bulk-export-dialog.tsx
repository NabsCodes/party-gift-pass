"use client";

import { Spinner } from "@/components/ui/spinner";

export function BulkExportDialog({
  progress,
}: {
  progress: {
    phase: "preparing" | "rendering";
    complete: number;
    total: number;
  } | null;
}) {
  if (!progress) return null;
  const rendering = progress.phase === "rendering";
  const percent = rendering
    ? Math.round((progress.complete / Math.max(progress.total, 1)) * 100)
    : 0;
  return (
    <div className="bg-ink/60 fixed inset-0 z-40 grid place-items-center p-4">
      <section
        className="bg-paper w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)]"
        role="status"
        aria-live="assertive"
      >
        <div className="flex items-center gap-3">
          <Spinner className="text-red size-5" />
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Creating your ZIP
          </p>
        </div>
        <h2 className="font-display mt-5 text-[clamp(1.8rem,3vw,2.4rem)] leading-[0.95] uppercase">
          {rendering
            ? `Preparing ${progress.complete} of ${progress.total}`
            : "Getting selected passes"}
        </h2>
        <p className="text-muted mt-4 text-sm leading-relaxed">
          {rendering
            ? "The images are being created on this device. Keep this tab open."
            : "Secure pass links are being prepared for this download."}
        </p>
        <div className="bg-line mt-6 h-2 overflow-hidden rounded-full">
          <div
            className="bg-red h-full transition-[width] duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>
    </div>
  );
}
