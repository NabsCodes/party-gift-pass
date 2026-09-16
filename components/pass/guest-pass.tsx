import Image from "next/image";
import { party } from "@/lib/event";

export function GuestPass({
  valid,
  qr,
}: {
  valid: boolean;
  qr: string | null;
}) {
  return (
    <main className="bg-cream min-h-dvh">
      <header className="bg-red px-gutter flex min-h-[4.7rem] items-center justify-between text-white">
        <p className="font-display text-[1.05rem] font-bold tracking-wide uppercase">
          {party.title}
        </p>
        <p className="text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Gift pass
        </p>
      </header>
      <section className="px-gutter mx-auto w-full max-w-160 py-[clamp(1.8rem,6vw,3.5rem)]">
        {valid && qr ? (
          <>
            <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
              A little thank-you
            </p>
            <h1 className="font-display mt-3 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.88] font-bold tracking-[-0.04em] uppercase">
              Big smiles.
              <br />
              One special gift.
            </h1>
            <div className="mt-8 grid items-center gap-8 sm:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)]">
              <Image
                src={qr}
                alt="Gift pass QR code"
                width={320}
                height={320}
                unoptimized
                className="bg-paper mx-auto aspect-square w-full max-w-80"
              />
              <div>
                <p className="font-display text-[1.35rem] leading-[1.05] font-bold uppercase">
                  Your gift is waiting at the gift table.
                </p>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  Show this code to a staff member. One pass. One gift. All
                  yours.
                </p>
              </div>
            </div>
            <div className="border-line mt-10 flex flex-wrap items-end justify-between gap-3 border-t border-dashed pt-6">
              <p className="text-sm">{party.date}</p>
              <p className="text-red text-[0.7rem] font-extrabold tracking-[0.08em] uppercase">
                Keep your pass private
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-[clamp(2rem,6vw,3rem)] leading-[0.95] font-bold uppercase">
              Pass not recognised.
            </h1>
            <p className="text-muted mt-6 text-sm leading-relaxed">
              Ask the organiser to send the pass again. Nothing was recorded by
              this visit.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
