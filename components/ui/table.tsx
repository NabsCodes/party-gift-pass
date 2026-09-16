import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("border-line border-b max-md:hidden", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-line hover:bg-line/40 data-[state=selected]:border-l-red data-[state=selected]:bg-red/6 border-b data-[state=selected]:border-l-[3px]",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-muted h-10 px-1 text-left align-middle text-[0.62rem] font-extrabold tracking-[0.12em] uppercase",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-1 py-3.5 align-middle", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
