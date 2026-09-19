"use client";

import { useState } from "react";
import { Check, Copy, Download, Eye, Share2, Trash2, X } from "lucide-react";
import { GuestDeleteDialog } from "./guest-delete-dialog";
import {
  guestStatusClass,
  guestStatusLabel,
  isNumberedGuest,
  numberedGuestSerial,
} from "@/lib/guest";
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
  previewPass,
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
  | "previewPass"
  | "download"
  | "markShared"
  | "remove"
>) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const locked = Boolean(busy);
  const confirmDelete = Boolean(selected && confirmId === selected.id);
  const canRemove = Boolean(
    selected &&
    (selected.isDemo ||
      (selected.status === "unused" && selected.sharedAt === null)),
  );

  return (
    <aside
      className={cn(
        "border-ink bg-paper px-gutter relative min-w-0 overflow-hidden py-[clamp(2rem,4vw,4rem)] lg:sticky lg:top-2 lg:h-[calc(100dvh-1rem)] lg:max-h-[calc(100dvh-1rem)] lg:self-start lg:overflow-y-auto lg:border-l",
        selected
          ? "max-lg:fixed max-lg:inset-0 max-lg:z-10 max-lg:overflow-y-auto"
          : "max-lg:hidden",
      )}
    >
      {selected ? (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-red text-[0.68rem] font-extrabold tracking-[0.16em] uppercase">
                  {isNumberedGuest(selected.name)
                    ? "Unnamed pass"
                    : "Personal pass"}
                </p>
                <span
                  className="text-muted text-[0.68rem] font-bold"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span className="text-muted font-display text-[0.85rem] font-bold tracking-wider uppercase">
                  #
                  {numberedGuestSerial(selected.name) ??
                    String(guests.indexOf(selected) + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-display mt-2 text-[clamp(2rem,2.8vw,2.75rem)] leading-[0.92] tracking-tight wrap-break-word uppercase">
                {isNumberedGuest(selected.name)
                  ? "This card admits one"
                  : selected.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-1 text-[0.59rem] font-extrabold tracking-wide uppercase",
                    statusTone[guestStatusClass(selected)],
                  )}
                >
                  {guestStatusLabel(selected)}
                </span>
                <span className="text-muted bg-cream/70 border-line rounded border px-2 py-0.5 font-mono text-[0.65rem] font-bold tracking-wider uppercase">
                  {selected.number}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="-mt-2 -mr-2 shrink-0"
              onClick={() => {
                setConfirmId(null);
                setSelectedId(null);
              }}
              aria-label="Close guest details"
            >
              <X />
            </Button>
          </div>

          <div className="mt-6 grid gap-2.5">
            <Button
              disabled={locked}
              aria-busy={busy === "share"}
              onClick={() => sharePass(selected)}
              className="w-full justify-center"
            >
              <Share2 /> Share pass
            </Button>
            <Button
              variant="secondary"
              disabled={locked}
              aria-busy={busy === "copy"}
              onClick={() => copyLink(selected)}
              className="w-full justify-center"
            >
              <Copy /> Copy pass link
            </Button>
          </div>

          <div className="border-line mt-6 border-t pt-4">
            <p className="text-muted mb-2 text-[0.62rem] font-extrabold tracking-[0.14em] uppercase">
              Pass actions
            </p>
            <div className="grid gap-1">
              <button
                type="button"
                className="hover:bg-cream text-ink flex min-h-11 w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                disabled={locked}
                aria-busy={busy === "preview"}
                onClick={() => previewPass(selected)}
              >
                {busy === "preview" ? (
                  <Spinner className="size-4 shrink-0" />
                ) : (
                  <Eye className="text-muted size-4 shrink-0" />
                )}
                <span>Preview guest pass</span>
              </button>
              <button
                type="button"
                className="hover:bg-cream text-ink flex min-h-11 w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                disabled={locked}
                aria-busy={busy === "download"}
                onClick={() => download(selected)}
              >
                {busy === "download" ? (
                  <Spinner className="size-4 shrink-0" />
                ) : (
                  <Download className="text-muted size-4 shrink-0" />
                )}
                <span>Download invitation + pass images</span>
              </button>
              {!selected.sharedAt && (
                <button
                  type="button"
                  className="hover:bg-cream text-ink flex min-h-11 w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={locked}
                  aria-busy={busy === "bulk-mark"}
                  onClick={() => markShared(selected)}
                >
                  {busy === "bulk-mark" ? (
                    <Spinner className="size-4 shrink-0" />
                  ) : (
                    <Check className="text-muted size-4 shrink-0" />
                  )}
                  <span>Mark as shared</span>
                </button>
              )}
              {canRemove && (
                <button
                  type="button"
                  className="text-red hover:bg-red/5 flex min-h-11 w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={locked}
                  onClick={() => setConfirmId(selected.id)}
                >
                  <Trash2 className="text-red size-4 shrink-0" />
                  <span>
                    Remove {selected.isDemo ? "sample" : "unshared pass"}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="border-line bg-cream/60 mt-8 rounded-sm border p-3.5">
            <p className="text-red text-[0.62rem] font-extrabold tracking-[0.12em] uppercase">
              Dispatch rule
            </p>
            <p className="text-muted mt-1 text-[0.72rem] leading-relaxed">
              Possession of this private link is the guest credential. Only mark
              as shared after you have actually sent it.
            </p>
          </div>

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
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Pass details
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,3vw,3rem)] leading-[0.95] uppercase">
            Select a pass
            <br />
            to manage it.
          </h2>
          <p className="text-muted mt-4 max-w-sm text-sm leading-relaxed">
            Share, preview, download, or update one guest at a time from here.
          </p>
        </div>
      )}
    </aside>
  );
}
