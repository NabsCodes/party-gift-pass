import { Skeleton } from "@/components/ui/skeleton";
import { Brand } from "@/components/layout/brand";
import { SiteFooter } from "@/components/layout/site-footer";

export function RedemptionSkeleton() {
  return (
    <main
      className="bg-cream flex min-h-dvh flex-col"
      role="status"
      aria-live="polite"
    >
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand />
        <Skeleton className="h-3 w-20" />
      </header>
      <section className="mx-auto grid w-[min(38rem,calc(100%-2rem))] flex-1 justify-items-center gap-5 py-16 text-center">
        <Skeleton className="size-[4.2rem] rounded-full" />
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-24 w-[min(27rem,90%)]" />
        <Skeleton className="h-28 w-full max-w-xs" />
        <Skeleton className="h-12 w-full" />
      </section>
      <SiteFooter note="credit" />
      <span className="sr-only">Checking this pass</span>
    </main>
  );
}
