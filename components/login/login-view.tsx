import { Brand } from "@/components/layout/brand";
import { LoginForm } from "@/components/login/login-form";
import { party } from "@/lib/event";

export function LoginView({ next, demo }: { next: string; demo: boolean }) {
  return (
    <main className="bg-cream grid min-h-dvh lg:grid-cols-2">
      <section className="bg-red relative hidden overflow-hidden px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
        <Brand inverted />
        <div className="relative z-10 max-w-xl">
          <p className="text-yellow text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Mohammed Aadil is turning ten
          </p>
          <p className="font-display mt-3 text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase">
            Big day.
            <br />
            Little gifts.
            <br />
            <em className="not-italic">Happy kids.</em>
          </p>
          <p className="mt-6 max-w-md text-base leading-7 text-white/90">
            A little thank-you for every teammate.
            <br />
            Let’s make the handover feel just as special.
          </p>
        </div>
        <p className="relative z-10 text-sm font-extrabold tracking-[0.08em] uppercase">
          {party.shortDate} · Football · Friends · Fun
        </p>
        <span className="font-display pointer-events-none absolute -right-10 -bottom-16 text-[min(32vw,18rem)] leading-none font-bold text-white/10">
          10
        </span>
      </section>
      <section className="bg-paper flex min-h-dvh items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex justify-center lg:hidden">
            <Brand />
          </div>
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
              The team behind the party
            </p>
            <h1 className="font-display text-[2rem] leading-[0.95] font-bold tracking-[-0.03em] uppercase">
              Welcome to the gift club
            </h1>
            <p className="text-muted text-sm leading-relaxed text-balance">
              All your guests, their invitations, and one special gift each.
              Ready when you are.
            </p>
          </div>
          <LoginForm next={next} demo={demo} />
        </div>
      </section>
    </main>
  );
}
