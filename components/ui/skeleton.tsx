import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "bg-line/70 rounded-[0.35rem] motion-safe:animate-pulse",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
