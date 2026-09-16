import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-ink text-ink placeholder:text-muted focus-visible:ring-red/20 h-12 w-full min-w-0 border bg-white px-3 text-base outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
