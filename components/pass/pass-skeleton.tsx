import { Brand } from "@/components/layout/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { Skeleton } from "@/components/ui/skeleton";

export function PassSkeleton() {
  return (
    <main
      className="bg-cream flex min-h-dvh flex-col"
      role="status"
      aria-live="polite"
    >
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand href={null} />
        <span className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Gift pass
        </span>
      </header>
      <section className="px-gutter mx-auto grid w-full max-w-160 flex-1 gap-5 py-12">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-24 w-[min(30rem,90%)]" />
        <div className="grid items-center gap-8 sm:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)]">
          <Skeleton className="mx-auto aspect-square w-full max-w-80" />
          <div className="grid gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-[85%]" />
          </div>
        </div>
      </section>
      <SiteFooter note="pass" />
      <span className="sr-only">Preparing the gift pass</span>
    </main>
  );
}
