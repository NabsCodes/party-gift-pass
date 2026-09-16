import { party } from "@/lib/event";
import { Skeleton } from "@/components/ui/skeleton";

export function PassSkeleton() {
  return (
    <main className="bg-cream min-h-dvh" role="status" aria-live="polite">
      <header className="bg-red px-gutter flex min-h-[4.7rem] items-center justify-between text-white">
        <p className="font-display text-[1.05rem] font-bold tracking-wide uppercase">
          {party.title}
        </p>
        <span className="h-3 w-16 rounded-full bg-white/30" />
      </header>
      <section className="px-gutter mx-auto grid w-full max-w-160 gap-5 py-12">
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
      <span className="sr-only">Preparing the gift pass</span>
    </main>
  );
}
