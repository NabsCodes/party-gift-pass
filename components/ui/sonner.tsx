"use client";

import {
  CircleCheck,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-center"
      offset={24}
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "w-[min(22rem,calc(100vw-2rem))] border border-line bg-paper text-ink rounded-[0.35rem] shadow-none",
          title: "text-sm font-semibold",
          description: "text-muted",
        },
      }}
      {...props}
    />
  );
}
