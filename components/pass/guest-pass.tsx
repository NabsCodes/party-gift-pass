import Image from "next/image";
import { Brand } from "@/components/layout/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { PassCelebration } from "@/components/pass/pass-celebration";
import { partyCopy } from "@/lib/copy";
import { party } from "@/lib/event";

function QrFrame({ qr }: { qr: string }) {
  return (
    <div className="pass-qr-frame border-line relative mx-auto aspect-square w-full max-w-80 border p-1.5">
      <Image
        src={qr}
        alt="Gift pass QR code"
        width={320}
        height={320}
        unoptimized
        className="bg-paper aspect-square w-full"
      />
    </div>
  );
}

export function GuestPass({
  valid,
  qr,
}: {
  valid: boolean;
  qr: string | null;
}) {
  return (
    <main className="bg-cream flex min-h-dvh flex-col">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand href={null} />
        <span className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Gift pass
        </span>
      </header>
      <section className="px-gutter mx-auto w-full max-w-160 flex-1 py-[clamp(1.8rem,6vw,3.5rem)]">
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
            <PassCelebration />
            <div className="mt-8 grid items-center gap-8 sm:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)]">
              <QrFrame qr={qr} />
              <div className="pass-copy-enter">
                <p className="font-display text-[1.35rem] leading-[1.05] font-bold uppercase">
                  Your gift is waiting at the gift table.
                </p>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  {partyCopy.guestPass.showAtTable}
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
              {partyCopy.host.askToResend} Nothing was recorded by this visit.
            </p>
          </>
        )}
      </section>
      <SiteFooter note="pass" />
    </main>
  );
}
