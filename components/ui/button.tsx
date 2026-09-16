import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[0.35rem] text-[0.76rem] font-extrabold tracking-[0.045em] uppercase outline-none transition-colors focus-visible:ring-2 focus-visible:ring-red/30 disabled:cursor-not-allowed disabled:opacity-55 aria-busy:[&_svg:not([data-slot=spinner])]:hidden [&_svg]:size-[1.05rem] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-red bg-red text-white hover:bg-red-dark",
        secondary: "border border-ink bg-transparent text-ink hover:bg-line/50",
        outline: "border-line border bg-transparent text-ink hover:bg-line/40",
        ghost: "text-ink hover:bg-[#e7dfd1]",
        danger: "text-red hover:bg-red/5",
      },
      size: {
        default: "min-h-12 px-[1.15rem] py-3",
        wide: "h-12 w-full px-[1.15rem]",
        sm: "h-8 min-h-8 px-2.5 text-[0.65rem]",
        icon: "size-[2.35rem] rounded-full p-0",
        iconSm: "size-8 rounded-[0.35rem] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  const busy = props["aria-busy"] === true || props["aria-busy"] === "true";
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {busy ? <Spinner /> : null}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
