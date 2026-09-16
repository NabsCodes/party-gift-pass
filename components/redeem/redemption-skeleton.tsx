import { Skeleton } from "@/components/ui/skeleton";
import { Brand } from "@/components/layout/brand";

export function RedemptionSkeleton() {
  return (
    <main className="bg-cream min-h-dvh" role="status" aria-live="polite">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand />
        <Skeleton className="h-3 w-20" />
      </header>
      <section className="mx-auto grid w-[min(38rem,calc(100%-2rem))] justify-items-center gap-5 py-16 text-center">
        <Skeleton className="size-[4.2rem] rounded-full" />
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-24 w-[min(27rem,90%)]" />
        <Skeleton className="h-28 w-full max-w-xs" />
        <Skeleton className="h-12 w-full" />
      </section>
      <span className="sr-only">Checking this pass</span>
    </main>
  );
}
