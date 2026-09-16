import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-ink text-ink placeholder:text-muted focus-visible:ring-red/20 w-full resize-y border bg-white p-4 text-base leading-7 outline-none focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
