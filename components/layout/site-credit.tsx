import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteCredit({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-muted inline-flex items-center justify-center gap-1.5 text-center text-[0.63rem] font-extrabold tracking-[0.13em] uppercase",
        className,
      )}
    >
      Built by{" "}
      <Link
        href="https://vextralimited.com"
        target="_blank"
        rel="noreferrer"
        className="text-ink decoration-red/50 hover:text-red underline underline-offset-4 transition-colors"
      >
        Vextra
      </Link>
    </span>
  );
}
