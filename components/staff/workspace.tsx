"use client";

import { LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/layout/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { BulkActionBar } from "./bulk-action-bar";
import { BulkActionsDialog } from "./bulk-actions-dialog";
import { BulkExportDialog } from "./bulk-export-dialog";
import { BulkConfirmDialog } from "./bulk-confirm-dialog";
import { GuestComposer } from "./guest-composer";
import { GuestDetail } from "./guest-detail";
import { GuestList } from "./guest-list";
import { ShareQueue } from "./share-queue";
import { ScoreStrip } from "./score-strip";
import { Button } from "@/components/ui/button";
import { useStaffWorkspace } from "@/hooks/use-staff-workspace";
import { partyCopy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function Workspace({ demo }: { demo: boolean }) {
  const workspace = useStaffWorkspace();
  const [bulkConfirm, setBulkConfirm] = useState<"download" | "shared" | null>(
    null,
  );
  const [bulkActions, setBulkActions] = useState(false);
  const locked = Boolean(workspace.busy);
  const hasSelection = workspace.selectedGuests.length > 0;

  function downloadSelected() {
    if (workspace.selectedUnused.length > 50) {
      setBulkConfirm("download");
      return;
    }
    void workspace.downloadSelected();
  }

  function confirmBulkAction() {
    const action = bulkConfirm;
    setBulkConfirm(null);
    if (action === "download") void workspace.downloadSelected();
    if (action === "shared") void workspace.markSelectedShared();
  }

  function openBulkDownload() {
    setBulkActions(false);
    downloadSelected();
  }

  function openBulkMarkShared() {
    setBulkActions(false);
    setBulkConfirm("shared");
  }

  return (
    <main className={cn("bg-cream min-h-dvh", hasSelection && "pb-24")}>
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
            {partyCopy.desk.dashboardEyebrow}
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

      <section className="border-ink grid min-h-152 min-w-0 border-b lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.65fr)]">
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
          selectedIds={workspace.selectedIds}
          toggleSelected={workspace.toggleSelected}
          setPageSelected={workspace.setPageSelected}
          allVisibleSelected={workspace.allVisibleSelected}
          ready={workspace.ready}
        />
        <GuestDetail
          guests={workspace.guests}
          selected={workspace.selected}
          setSelectedId={workspace.setSelectedId}
          busy={workspace.busy}
          sharePass={workspace.sharePass}
          copyLink={workspace.copyLink}
          previewPass={workspace.previewPass}
          download={workspace.download}
          markShared={workspace.markShared}
          remove={workspace.remove}
        />
      </section>

      <BulkActionBar
        count={workspace.selectedGuests.length}
        matchingCount={workspace.filteredCount}
        collectedCount={workspace.selectedCollected}
        busy={workspace.busy}
        onSelectMatching={workspace.selectMatching}
        onClear={workspace.clearSelected}
        onShare={() => void workspace.startShareQueue()}
        onMoreActions={() => setBulkActions(true)}
      />

      <SiteFooter />

      <GuestComposer
        composer={workspace.composer}
        closeComposer={workspace.closeComposer}
        busy={workspace.busy}
        createBatch={workspace.createBatch}
      />
      {bulkActions ? (
        <BulkActionsDialog
          count={workspace.selectedUnused.length}
          busy={locked}
          onClose={() => setBulkActions(false)}
          onDownload={openBulkDownload}
          onMarkShared={openBulkMarkShared}
        />
      ) : null}
      {bulkConfirm ? (
        <BulkConfirmDialog
          kind={bulkConfirm}
          count={workspace.selectedUnused.length}
          excluded={workspace.selectedCollected}
          busy={locked}
          onCancel={() => setBulkConfirm(null)}
          onConfirm={confirmBulkAction}
        />
      ) : null}
      {workspace.shareQueue ? (
        <ShareQueue
          guests={workspace.shareQueue.guests}
          index={workspace.shareQueue.index}
          pass={workspace.shareQueue.pass}
          busy={workspace.busy}
          onClose={workspace.closeShareQueue}
          onShare={(pass) => void workspace.shareQueuedPass(pass)}
          onMarkShared={(pass) => void workspace.markQueuedPassShared(pass)}
          onSkip={workspace.skipQueuedPass}
        />
      ) : null}
      <BulkExportDialog progress={workspace.bulkProgress} />
    </main>
  );
}
