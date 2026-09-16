import { Brand } from "@/components/layout/brand";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main
      className="bg-cream grid min-h-dvh lg:grid-cols-2"
      role="status"
      aria-live="polite"
    >
      <section className="bg-green hidden p-12 text-white lg:grid lg:content-between">
        <Brand />
        <Skeleton className="h-36 w-[min(32rem,90%)] bg-white/15" />
      </section>
      <section className="px-gutter grid content-center py-12">
        <div className="mx-auto grid w-full max-w-md gap-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-20 w-[min(25rem,90%)]" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
      <span className="sr-only">Preparing gift desk sign-in</span>
    </main>
  );
}
