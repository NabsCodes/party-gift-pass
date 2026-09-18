import { SiteCredit } from "@/components/layout/site-credit";
import { cn } from "@/lib/utils";

export function SiteFooter({
  note = "staff",
  className,
}: {
  note?: "staff" | "pass" | "credit";
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "px-gutter flex flex-col items-center justify-center gap-3 py-6 text-center",
        className,
      )}
    >
      {note !== "credit" ? (
        <p className="text-muted flex max-w-md flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[0.63rem] font-extrabold tracking-[0.13em] uppercase">
          <span>One pass. One gift.</span>
          {note === "staff" ? (
            <>
              <span className="text-red" aria-hidden="true">
                ✳
              </span>
              <span>No double collections.</span>
            </>
          ) : null}
        </p>
      ) : null}
      <SiteCredit />
    </footer>
  );
}
