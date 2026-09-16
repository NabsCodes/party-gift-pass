import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

function Label({
  className,
  htmlFor,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        "text-ink flex items-center gap-2 text-[0.68rem] font-extrabold tracking-widest uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
