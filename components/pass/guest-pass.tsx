import Image from "next/image";
import { CircleOff } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { PassCelebration } from "@/components/pass/pass-celebration";
import { partyCopy } from "@/lib/copy";
import { party } from "@/lib/event";

function QrFrame({ qr }: { qr: string }) {
  return (
    <div className="pass-qr-frame border-ink bg-paper border-t-red relative mx-auto w-full max-w-80 border border-t-4 p-3">
      <span
        className="bg-green absolute top-0 right-0 size-3 translate-x-px -translate-y-px"
        aria-hidden="true"
      />
      <p className="text-red mb-2 text-center text-[0.58rem] font-extrabold tracking-[0.16em] uppercase">
        Gift table scan
      </p>
      <div className="border-line border bg-white p-2">
        <Image
          src={qr}
          alt="Gift pass QR code — scan at the gift table"
          width={320}
          height={320}
          unoptimized
          className="aspect-square w-full"
        />
      </div>
      <p className="text-muted mt-2 text-center text-[0.58rem] font-extrabold tracking-[0.1em] uppercase">
        One pass · One gift
      </p>
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
          <div className="border-ink border-t-red relative overflow-hidden border border-t-4 p-[clamp(1.5rem,5vw,3rem)]">
            <span
              className="font-display text-red/10 pointer-events-none absolute top-4 right-5 text-[6rem] leading-none font-bold"
              aria-hidden="true"
            >
              10
            </span>
            <span className="bg-red mb-6 grid size-14 place-items-center rounded-full text-white">
              <CircleOff aria-hidden="true" />
            </span>
            <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
              Gift pass check
            </p>
            <h1 className="font-display mt-3 max-w-xl text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.88] font-bold tracking-[-0.04em] uppercase">
              This pass isn’t
              <br />
              in the line-up.
            </h1>
            <p className="text-muted mt-6 max-w-md text-sm leading-relaxed">
              The link may be incomplete, old, or incorrect. Nothing was
              collected. {partyCopy.host.askToResend}
            </p>
          </div>
        )}
      </section>
      <SiteFooter note="pass" />
    </main>
  );
}
