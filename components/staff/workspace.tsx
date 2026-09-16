"use client";

import { LogOut, Plus } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { GuestComposer } from "./guest-composer";
import { GuestDetail } from "./guest-detail";
import { GuestList } from "./guest-list";
import { ScoreStrip } from "./score-strip";
import { Button } from "@/components/ui/button";
import { useStaffWorkspace } from "@/hooks/use-staff-workspace";

export function Workspace({ demo }: { demo: boolean }) {
  const workspace = useStaffWorkspace();

  return (
    <main className="bg-cream min-h-dvh">
      <header className="border-line px-gutter flex min-h-[4.7rem] items-center justify-between border-b">
        <Brand />
        <div className="flex items-center gap-2.5">
          {demo && (
            <span className="border-line text-muted rounded-full border px-2 py-1.5 text-[0.62rem] font-extrabold tracking-widest uppercase max-[480px]:hidden">
              Local demo
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={workspace.signOut}
            aria-label="Sign out"
          >
            <LogOut />
          </Button>
        </div>
      </header>

      <section className="px-gutter flex flex-col items-start gap-4 bg-[linear-gradient(105deg,transparent_65%,rgb(223_31_38/8%)_65%),linear-gradient(75deg,transparent_83%,rgb(18_96_68/10%)_83%)] py-4 md:py-8 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
        <div className="max-w-4xl min-w-0">
          <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            Aadil’s Matchday · Admin dashboard
          </p>
          <h1 className="font-display mt-1 text-[clamp(1.9rem,5vw,5.2rem)] leading-[0.88] font-bold tracking-[-0.045em] uppercase md:mt-3">
            Every guest.
            <br />
            <i className="text-red not-italic">One good surprise.</i>
          </h1>
        </div>
        <Button
          className="w-full shrink-0 sm:w-auto"
          onClick={workspace.openComposer}
        >
          <Plus /> Create passes
        </Button>
      </section>

      <ScoreStrip
        total={workspace.total}
        sent={workspace.sent}
        collected={workspace.collected}
        remaining={workspace.remaining}
      />

      <section className="border-ink grid min-h-152 border-b lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.65fr)]">
        <GuestList
          query={workspace.query}
          search={workspace.search}
          filter={workspace.filter}
          changeFilter={workspace.changeFilter}
          visible={workspace.visible}
          filteredCount={workspace.filteredCount}
          page={workspace.page}
          pageCount={workspace.pageCount}
          pageSize={workspace.pageSize}
          from={workspace.from}
          to={workspace.to}
          setPage={workspace.setPage}
          setPageSize={workspace.setPageSize}
          selectedId={workspace.selectedId}
          setSelectedId={workspace.setSelectedId}
        />
        <GuestDetail
          guests={workspace.guests}
          selected={workspace.selected}
          setSelectedId={workspace.setSelectedId}
          busy={workspace.busy}
          sharePass={workspace.sharePass}
          copyLink={workspace.copyLink}
          download={workspace.download}
          markShared={workspace.markShared}
          remove={workspace.remove}
        />
      </section>

      <footer className="px-gutter text-muted flex justify-center gap-2.5 py-5 text-center text-[0.63rem] font-extrabold tracking-[0.13em] uppercase">
        One pass. One gift. <span className="text-red">✳</span> No double
        collections.
      </footer>

      <GuestComposer
        composer={workspace.composer}
        closeComposer={workspace.closeComposer}
        busy={workspace.busy}
        createBatch={workspace.createBatch}
      />
    </main>
  );
}
