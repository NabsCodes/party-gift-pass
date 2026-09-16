"use client";

import { Gift, MessageCircle, Users } from "lucide-react";

export function ScoreStrip({
  total,
  sent,
  collected,
  remaining,
}: {
  total: number;
  sent: number;
  collected: number;
  remaining: number;
}) {
  return (
    <section
      className="border-ink bg-paper grid grid-cols-2 border-y lg:grid-cols-4"
      aria-label="Guest overview"
    >
      <div className="border-line flex min-h-[3.85rem] flex-col justify-center border-r border-b py-2.5 pr-3.5 pl-(--gutter) lg:min-h-[7.7rem] lg:border-b-0 lg:py-4">
        <strong className="font-display text-[1.45rem] leading-none lg:text-[2.35rem]">
          {total}
        </strong>
        <span className="text-muted mt-1.5 flex items-center gap-1.5 text-[0.61rem] font-bold uppercase lg:mt-2 lg:text-xs">
          <Users className="size-3.5" /> Guests
        </span>
      </div>
      <div className="border-line flex min-h-[3.85rem] flex-col justify-center border-b py-2.5 pr-(--gutter) pl-3.5 lg:min-h-[7.7rem] lg:border-r lg:border-b-0 lg:py-4 lg:pr-3.5">
        <strong className="font-display text-[1.45rem] leading-none lg:text-[2.35rem]">
          {sent}
        </strong>
        <span className="text-muted mt-1.5 flex items-center gap-1.5 text-[0.61rem] font-bold uppercase lg:mt-2 lg:text-xs">
          <MessageCircle className="size-3.5" /> Passes sent
        </span>
      </div>
      <div className="border-line flex min-h-[3.85rem] flex-col justify-center border-r py-2.5 pr-3.5 pl-(--gutter) lg:min-h-[7.7rem] lg:py-4 lg:pl-3.5">
        <strong className="font-display text-[1.45rem] leading-none lg:text-[2.35rem]">
          {collected}
        </strong>
        <span className="text-muted mt-1.5 flex items-center gap-1.5 text-[0.61rem] font-bold uppercase lg:mt-2 lg:text-xs">
          <Gift className="size-3.5" /> Gifts collected
        </span>
      </div>
      <div className="bg-green flex min-h-[3.85rem] flex-col justify-center py-2.5 pr-(--gutter) pl-3.5 text-white lg:min-h-[7.7rem] lg:py-4">
        <strong className="font-display text-[1.45rem] leading-none lg:text-[2.35rem]">
          {remaining}
        </strong>
        <span className="mt-1.5 text-[0.61rem] font-bold text-[#cee6dc] uppercase lg:mt-2 lg:text-xs">
          Still to collect
        </span>
      </div>
    </section>
  );
}
