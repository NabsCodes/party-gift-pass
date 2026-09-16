import { Skeleton } from "@/components/ui/skeleton";

function StaffListSkeleton() {
  return (
    <div className="grid gap-3" aria-hidden="true">
      <div className="border-line flex items-center justify-between border-b pb-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-12" />
      </div>
      {Array.from({ length: 7 }, (_, index) => (
        <div
          className="border-line/70 grid grid-cols-[2.1rem_minmax(0,1fr)_4.5rem_1rem] items-center gap-3 border-b py-3"
          key={index}
        >
          <Skeleton className="size-[2.1rem] rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-3 w-[min(13rem,70%)]" />
            <Skeleton className="h-2.5 w-24" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="size-3 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function StaffWorkspaceSkeleton() {
  return (
    <main className="bg-cream min-h-dvh" role="status" aria-live="polite">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="size-9 rounded-full" />
      </header>
      <section className="px-gutter flex flex-col gap-4 py-8">
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-20 w-[min(34rem,90%)]" />
        <Skeleton className="h-12 w-40" />
      </section>
      <div className="border-ink grid grid-cols-2 border-y lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div className="border-line grid gap-3 border-r p-5" key={index}>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      <section className="px-gutter py-8 lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.65fr)] lg:gap-10">
        <div className="grid gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-full" />
          <StaffListSkeleton />
        </div>
        <div className="mt-8 hidden min-h-112 gap-5 lg:grid">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-28 w-40" />
          <Skeleton className="h-12 w-56" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
      <span className="sr-only">Opening the guest list</span>
    </main>
  );
}

export { StaffListSkeleton, StaffWorkspaceSkeleton };
