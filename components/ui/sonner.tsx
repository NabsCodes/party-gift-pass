"use client";

import { CircleCheck, Info, OctagonX, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { Spinner } from "@/components/ui/spinner";

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
        loading: <Spinner />,
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
