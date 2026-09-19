"use client";

import Link from "next/link";
import { ArrowRight, FlagTriangleRight, RotateCcw } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button, buttonVariants } from "@/components/ui/button";

export function PartyFallback({
  code,
  eyebrow,
  title,
  copy,
  onRetry,
}: {
  code: string;
  eyebrow: string;
  title: string;
  copy: string;
  onRetry?: () => void;
}) {
  return (
    <main className="bg-cream flex min-h-dvh flex-col">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand href={null} />
        <span className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Matchday help
        </span>
      </header>
      <section className="px-gutter mx-auto grid w-full max-w-240 flex-1 place-items-center py-[clamp(2rem,8vw,6rem)]">
        <div className="border-ink bg-paper border-t-red relative w-full max-w-3xl overflow-hidden border border-t-4 p-[clamp(1.5rem,6vw,4rem)]">
          <div className="bg-green/8 pointer-events-none absolute inset-x-0 top-0 h-2/5" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <span className="bg-red grid size-14 place-items-center rounded-full text-white">
                <FlagTriangleRight aria-hidden="true" />
              </span>
              <span className="font-display text-red/15 text-[clamp(4rem,14vw,8rem)] leading-[0.7] font-bold">
                {code}
              </span>
            </div>
            <p className="text-red mt-10 text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
              {eyebrow}
            </p>
            <h1 className="font-display mt-3 max-w-2xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.84] font-bold tracking-[-0.045em] uppercase">
              {title}
            </h1>
            <p className="text-muted mt-6 max-w-lg text-sm leading-relaxed">
              {copy}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {onRetry ? (
                <Button onClick={onRetry}>
                  Try again <RotateCcw />
                </Button>
              ) : null}
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href="/staff"
              >
                Gift desk sign-in <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter note="pass" />
    </main>
  );
}
