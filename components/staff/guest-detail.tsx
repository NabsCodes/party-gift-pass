"use client";

import { useState } from "react";
import { Check, Copy, Download, Share2, Trash2, X } from "lucide-react";
import { GuestDeleteDialog } from "./guest-delete-dialog";
import { guestStatusClass, guestStatusLabel } from "@/lib/guest";
import type { StaffWorkspaceState } from "@/hooks/use-staff-workspace";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const statusTone = {
  unused: "bg-[#e5ddd0] text-[#5b554d]",
  shared: "bg-[#f7df8d] text-[#654b00]",
  redeemed: "bg-[#cee6dc] text-green",
};

export function GuestDetail({
  guests,
  selected,
  setSelectedId,
  busy,
  sharePass,
  copyLink,
  download,
  markShared,
  remove,
}: Pick<
  StaffWorkspaceState,
  | "guests"
  | "selected"
  | "setSelectedId"
  | "busy"
  | "sharePass"
  | "copyLink"
  | "download"
  | "markShared"
  | "remove"
>) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const locked = Boolean(busy);
  const confirmDelete = Boolean(selected && confirmId === selected.id);

  return (
    <aside
      className={cn(
        "border-ink bg-paper px-gutter relative min-w-0 overflow-hidden py-[clamp(2rem,4vw,4rem)] lg:border-l",
        selected
          ? "max-lg:fixed max-lg:inset-0 max-lg:z-10 max-lg:overflow-y-auto"
          : "max-lg:hidden",
      )}
    >
      {selected ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={() => {
              setConfirmId(null);
              setSelectedId(null);
            }}
            aria-label="Close guest details"
          >
            <X />
          </Button>
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Personal pass
          </p>
          <div className="font-display text-red/15 mt-8 -mb-6 text-[7rem] leading-none font-bold">
            {String(guests.indexOf(selected) + 1).padStart(2, "0")}
          </div>
          <h2 className="font-display text-[clamp(2rem,3vw,3rem)] leading-[0.95] uppercase">
            {selected.name}
          </h2>
          <p className="text-muted text-xs tracking-wide">{selected.number}</p>
          <span
            className={cn(
              "mt-4 inline-flex w-fit rounded-full px-3 py-2 text-[0.59rem] font-extrabold tracking-wide uppercase",
              statusTone[guestStatusClass(selected)],
            )}
          >
            {guestStatusLabel(selected)}
          </span>
          <div className="mt-8 grid gap-3">
            <Button
              disabled={locked}
              aria-busy={busy === "share"}
              onClick={() => sharePass(selected)}
            >
              <Share2 /> Share pass
            </Button>
            <Button
              variant="secondary"
              disabled={locked}
              aria-busy={busy === "copy"}
              onClick={() => copyLink(selected)}
            >
              <Copy /> Copy pass link
            </Button>
            <button
              type="button"
              className="border-line flex min-h-[2.7rem] items-center gap-2.5 border-b py-2 text-left text-xs font-extrabold disabled:cursor-not-allowed disabled:opacity-55"
              disabled={locked}
              aria-busy={busy === "download"}
              onClick={() => download(selected)}
            >
              {busy === "download" ? (
                <Spinner className="size-4" />
              ) : (
                <Download className="size-4" />
              )}{" "}
              Download invitation + pass images
            </button>
            {!selected.sharedAt && (
              <button
                type="button"
                className="border-line flex min-h-[2.7rem] items-center gap-2.5 border-b py-2 text-left text-xs font-extrabold disabled:cursor-not-allowed disabled:opacity-55"
                disabled={locked}
                onClick={() => markShared(selected)}
              >
                <Check className="size-4" /> Mark as shared
              </button>
            )}
            {(selected.status === "unused" || selected.isDemo) && (
              <button
                type="button"
                className="border-line text-red flex min-h-[2.7rem] items-center gap-2.5 border-b py-2 text-left text-xs font-extrabold disabled:cursor-not-allowed disabled:opacity-55"
                disabled={locked}
                onClick={() => setConfirmId(selected.id)}
              >
                <Trash2 className="size-4" /> Delete{" "}
                {selected.isDemo ? "sample" : "guest"}
              </button>
            )}
          </div>
          <p className="border-yellow text-muted mt-7 border-l-2 pl-3 text-[0.68rem] leading-6">
            Anyone with this private link can use the pass first. Send it only
            to the intended family. A completed phone share is marked shared;
            copied links and desktop WhatsApp stay manual.
          </p>
          {confirmDelete && (
            <GuestDeleteDialog
              guest={selected}
              busy={busy === "delete"}
              onCancel={() => setConfirmId(null)}
              onConfirm={() => remove(selected)}
            />
          )}
        </>
      ) : (
        <div className="flex min-h-112 flex-col justify-center">
          <span className="font-display text-red/15 text-[7rem] leading-[0.8] font-bold">
            10
          </span>
          <h2 className="font-display -mt-4 text-[clamp(2rem,3vw,3rem)] leading-[0.95] uppercase">
            Pick a pass
            <br />
            from the admin list.
          </h2>
          <p className="text-muted text-xs tracking-wide">
            Then send the pass, or download the images if you need them.
          </p>
        </div>
      )}
    </aside>
  );
}
