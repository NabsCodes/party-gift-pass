import { PartyPopper, Sparkles, TicketCheck } from "lucide-react";

export function InitializationCard() {
  return (
    <section
      aria-labelledby="page-title"
      className="border-party-ink/10 bg-party-paper relative w-full max-w-2xl overflow-hidden rounded-[2rem] border-2 px-6 py-10 text-center shadow-[0_22px_70px_rgba(39,35,74,0.14)] sm:px-12 sm:py-14"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#f16f61_0_25%,#f6c94c_25%_50%,#63b8d9_50%_75%,#5146a6_75%)]" />

      <div className="bg-party-coral mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl text-white shadow-[0_10px_25px_rgba(241,111,97,0.28)] sm:size-20">
        <PartyPopper aria-hidden="true" className="size-8 sm:size-10" />
      </div>

      <div className="border-party-indigo/15 bg-party-indigo/6 text-party-indigo mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-extrabold tracking-wide">
        <Sparkles aria-hidden="true" className="size-4" />
        Foundation ready
      </div>

      <h1
        id="page-title"
        className="font-display text-party-ink text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-6xl"
      >
        Party Gift Pass
      </h1>

      <p className="text-party-ink/72 mx-auto mt-5 max-w-lg text-lg leading-8 font-semibold sm:text-xl">
        Party Gift Pass has been initialized. The foundation is ready for the
        next joyful phase.
      </p>

      <div className="bg-party-blue/13 text-party-ink/80 mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold">
        <TicketCheck aria-hidden="true" className="text-party-indigo size-5" />
        Secure one-time ticket architecture
      </div>
    </section>
  );
}
