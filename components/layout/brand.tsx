import Link from "next/link";
import { partyCopy } from "@/lib/copy";
import { party } from "@/lib/event";
import { cn } from "@/lib/utils";

export function Brand({
  inverted = false,
  href = "/staff",
}: {
  inverted?: boolean;
  href?: string | null;
}) {
  const label = partyCopy.desk.brandHome;
  const mark = (
    <>
      <span
        className={cn(
          "font-display grid size-[2.15rem] place-items-center text-xl font-bold",
          inverted ? "text-red bg-white" : "bg-red text-white",
        )}
      >
        10
      </span>
      <span className="flex flex-col leading-none">
        <strong className="font-display text-sm font-bold uppercase sm:text-base">
          {party.title}
        </strong>
        <small
          className={cn(
            "mt-1 text-[0.58rem] font-extrabold tracking-[0.12em] uppercase max-[480px]:hidden",
            inverted ? "text-white/75" : "text-muted",
          )}
        >
          The Gift Club · {party.shortDate}
        </small>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="inline-flex items-center gap-3" aria-label={label}>
        {mark}
      </div>
    );
  }

  return (
    <Link
      className="inline-flex items-center gap-3"
      href={href}
      aria-label={label}
    >
      {mark}
    </Link>
  );
}
