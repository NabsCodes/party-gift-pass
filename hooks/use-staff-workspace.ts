"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { api, SessionExpired, staffLoginPath } from "@/lib/browser-api";
import { createBulkPassZip, downloadBlob } from "@/lib/bulk-export";
import {
  invitationShareTitle,
  passShareMessage,
  passShareText,
  whatsappShareHref,
} from "@/lib/event";
import {
  filterGuests,
  GUEST_PAGE_SIZE,
  guestOverview,
  paginateGuests,
  type Guest,
  type ListFilter,
  type PassPayload,
} from "@/lib/guest";
import { createPassArtwork, downloadArtwork } from "@/lib/pass-art";

export type CreationMode = "numbered" | "named";
export type StaffBusy =
  | "create"
  | "share"
  | "copy"
  | "preview"
  | "download"
  | "delete"
  | "rename"
  | "bulk-download"
  | "bulk-queue"
  | "bulk-mark"
  | "queue-share"
  | "queue-skip"
  | null;

type BulkPassResponse = { passes: PassPayload[]; skippedIds: string[] };
type BulkSharedResponse = { updatedIds: string[]; skippedIds: string[] };
type BulkProgress = {
  phase: "preparing" | "rendering";
  complete: number;
  total: number;
};
type ShareQueueState = {
  guests: Guest[];
  index: number;
  pass: PassPayload | null;
};
const BULK_LIMIT = 200;

export function useStaffWorkspace() {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState(false);
  const [filter, setFilter] = useState<ListFilter>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(GUEST_PAGE_SIZE);
  const [busy, setBusy] = useState<StaffBusy>(null);
  const [ready, setReady] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<BulkProgress | null>(null);
  const [shareQueue, setShareQueue] = useState<ShareQueueState | null>(null);

  const selected = guests.find((guest) => guest.id === selectedId) || null;
  const filtered = useMemo(
    () => filterGuests(guests, query, filter),
    [filter, guests, query],
  );
  const listing = paginateGuests(filtered, page, pageSize);
  const overview = guestOverview(guests);
  const selectedGuests = useMemo(
    () => guests.filter((guest) => selectedIds.includes(guest.id)),
    [guests, selectedIds],
  );
  const selectedUnused = useMemo(
    () => selectedGuests.filter((guest) => guest.status === "unused"),
    [selectedGuests],
  );
  const selectedCollected = selectedGuests.length - selectedUnused.length;

  async function run<T>(work: () => Promise<T>) {
    try {
      return await work();
    } catch (error) {
      if (error instanceof SessionExpired) {
        router.push(staffLoginPath("/staff"));
        return;
      }
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  async function refresh() {
    const result = await run(() =>
      api<{ guests: Guest[] }>("/api/staff/tickets"),
    );
    if (result) setGuests(result.guests);
  }

  useEffect(() => {
    let active = true;
    api<{ guests: Guest[] }>("/api/staff/tickets")
      .then((result) => {
        if (active) setGuests(result.guests);
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof SessionExpired)
          router.push(staffLoginPath("/staff"));
        else
          toast.error(
            error instanceof Error ? error.message : "Could not load guests.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [router]);

  function search(value: string) {
    setQuery(value);
    setPage(1);
  }

  function changeFilter(value: ListFilter) {
    setFilter(value);
    setPage(1);
  }

  function changePageSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  async function withBusy<T>(
    action: Exclude<StaffBusy, null>,
    work: () => Promise<T>,
  ) {
    setBusy(action);
    try {
      return await work();
    } finally {
      setBusy(null);
    }
  }

  function toggleSelected(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= BULK_LIMIT) {
        toast.error(`Bulk actions are limited to ${BULK_LIMIT} passes.`);
        return current;
      }
      return [...current, id];
    });
  }

  function setPageSelected(checked: boolean) {
    const pageIds = listing.items.map((guest) => guest.id);
    if (!checked) {
      setSelectedIds((current) =>
        current.filter((id) => !pageIds.includes(id)),
      );
      return;
    }
    setSelectedIds((current) => {
      const next = new Set(current);
      for (const id of pageIds) {
        if (next.size >= BULK_LIMIT) break;
        next.add(id);
      }
      if (next.size < new Set([...current, ...pageIds]).size)
        toast.error(`Bulk actions are limited to ${BULK_LIMIT} passes.`);
      return [...next];
    });
  }

  function selectMatching() {
    if (filtered.length > BULK_LIMIT) {
      toast.error(`Narrow the list to ${BULK_LIMIT} passes or fewer first.`);
      return;
    }
    setSelectedIds(filtered.map((guest) => guest.id));
  }

  async function createBatch(input: {
    mode: CreationMode;
    quantity?: number;
    names?: string[];
  }) {
    await withBusy("create", () =>
      run(async () => {
        const result = await api<{ guests: Guest[] }>(
          "/api/staff/tickets",
          "POST",
          {
            batchId: crypto.randomUUID(),
            ...(input.mode === "numbered"
              ? { quantity: input.quantity }
              : { names: input.names }),
          },
        );
        setComposer(false);
        setPage(1);
        await refresh();
        setSelectedId(null);
        toast.success(
          `${result.guests.length} pass${result.guests.length === 1 ? "" : "es"} created.`,
        );
      }),
    );
  }

  async function getPass(guest: Guest) {
    return run(() => api<PassPayload>(`/api/staff/tickets/${guest.id}/pass`));
  }

  async function getBulkPasses(ids: string[]) {
    return run(() =>
      api<BulkPassResponse>("/api/staff/tickets/bulk-pass", "POST", { ids }),
    );
  }

  async function markGuestIdsShared(ids: string[]) {
    const result = await run(() =>
      api<BulkSharedResponse>("/api/staff/tickets/bulk-shared", "PATCH", {
        ids,
      }),
    );
    if (!result) return;
    const updated = new Set(result.updatedIds);
    setGuests((current) =>
      current.map((guest) =>
        updated.has(guest.id)
          ? { ...guest, sharedAt: new Date().toISOString() }
          : guest,
      ),
    );
    return result;
  }

  async function sharePayload(pass: PassPayload) {
    const text = passShareText(pass.guest, pass.passUrl);
    const payload = {
      title: invitationShareTitle(pass.guest),
      text: passShareMessage(pass.guest),
      url: pass.passUrl,
    };
    try {
      if (typeof navigator.share === "function") {
        await navigator.share(
          navigator.canShare?.(payload) ? payload : { text },
        );
        toast.info("Share sheet closed. Mark shared only after you send it.");
        return;
      }
      window.open(whatsappShareHref(text), "_blank", "noopener,noreferrer");
      toast.info("WhatsApp opened. Mark shared only after you send it.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      window.open(whatsappShareHref(text), "_blank", "noopener,noreferrer");
      toast.info("WhatsApp opened. Mark shared only after you send it.");
    }
  }

  async function sharePass(guest: Guest) {
    await withBusy("share", async () => {
      const pass = await getPass(guest);
      if (pass) await sharePayload(pass);
    });
  }

  async function copyLink(guest: Guest) {
    await withBusy("copy", async () => {
      const pass = await getPass(guest);
      if (!pass) return;
      try {
        await navigator.clipboard.writeText(pass.passUrl);
        toast.success("Pass link copied. Send it, then mark it as shared.");
      } catch {
        toast.error("Could not copy the link. Download the images instead.");
      }
    });
  }

  async function previewPass(guest: Guest) {
    const preview = window.open("about:blank", "_blank");
    if (!preview) {
      toast.error("Allow pop-ups to preview this guest pass.");
      return;
    }
    preview.opener = null;
    await withBusy("preview", async () => {
      const pass = await getPass(guest);
      if (pass) preview.location.replace(pass.passUrl);
      else preview.close();
    });
  }

  async function download(guest: Guest) {
    await withBusy("download", async () => {
      const pass = await getPass(guest);
      if (pass) (await createPassArtwork(pass)).forEach(downloadArtwork);
    });
  }

  async function downloadSelected() {
    const ids = selectedUnused.map((guest) => guest.id);
    if (!ids.length) return;
    await withBusy("bulk-download", async () => {
      setBulkProgress({ phase: "preparing", complete: 0, total: ids.length });
      try {
        const result = await getBulkPasses(ids);
        if (!result?.passes.length) {
          toast.error("No unused passes could be prepared.");
          return;
        }
        const byId = new Map(selectedGuests.map((guest) => [guest.id, guest]));
        const skippedNumbers = result.skippedIds.flatMap((id) => {
          const guest = byId.get(id);
          return guest ? [guest.number] : [];
        });
        setBulkProgress({
          phase: "rendering",
          complete: 0,
          total: result.passes.length,
        });
        const archive = await createBulkPassZip(
          result.passes,
          (complete, total) =>
            setBulkProgress({ phase: "rendering", complete, total }),
          skippedNumbers,
        );
        downloadBlob(
          archive.blob,
          `party-gift-passes-${new Date().toISOString().slice(0, 10)}.zip`,
        );
        toast.success(
          `${result.passes.length} pass${result.passes.length === 1 ? "" : "es"} prepared in one ZIP.`,
        );
        if (archive.issues.length)
          toast.warning(
            `${archive.issues.length} pass${archive.issues.length === 1 ? " was" : "es were"} listed in EXPORT-ISSUES.txt.`,
          );
      } finally {
        setBulkProgress(null);
      }
    });
  }

  async function markSelectedShared() {
    const result = await withBusy("bulk-mark", () =>
      markGuestIdsShared(selectedUnused.map((guest) => guest.id)),
    );
    if (!result) return;
    toast.success(
      `${result.updatedIds.length} pass${result.updatedIds.length === 1 ? "" : "es"} marked as shared.`,
    );
    if (result.skippedIds.length)
      toast.warning(
        `${result.skippedIds.length} pass${result.skippedIds.length === 1 ? " was" : "es were"} not updated.`,
      );
  }

  async function loadQueuePass(guests: Guest[], index: number) {
    const pass = await getPass(guests[index]);
    if (!pass) {
      setShareQueue(null);
      return;
    }
    setShareQueue((current) =>
      current && current.guests === guests && current.index === index
        ? { ...current, pass }
        : current,
    );
  }

  async function startShareQueue() {
    const queueGuests = selectedUnused;
    if (!queueGuests.length) {
      toast.error("Select an unused pass to share.");
      return;
    }
    await withBusy("bulk-queue", async () => {
      setShareQueue({ guests: queueGuests, index: 0, pass: null });
      await loadQueuePass(queueGuests, 0);
    });
  }

  async function shareQueuedPass(pass: PassPayload) {
    await withBusy("queue-share", () => sharePayload(pass));
  }

  async function advanceQueue() {
    if (!shareQueue) return;
    const nextIndex = shareQueue.index + 1;
    if (nextIndex >= shareQueue.guests.length) {
      setShareQueue(null);
      toast.success("Finished sharing selected passes.");
      return;
    }
    const guests = shareQueue.guests;
    setShareQueue({ guests, index: nextIndex, pass: null });
    await loadQueuePass(guests, nextIndex);
  }

  async function markQueuedPassShared(pass: PassPayload) {
    await withBusy("bulk-mark", async () => {
      const result = await markGuestIdsShared([pass.guest.id]);
      if (!result?.updatedIds.length) {
        toast.warning(
          "This pass was not updated. Refresh the list before continuing.",
        );
        return;
      }
      toast.success(`${pass.guest.name} marked as shared.`);
      await advanceQueue();
    });
  }

  async function markShared(guest: Guest) {
    await withBusy("bulk-mark", async () => {
      const result = await markGuestIdsShared([guest.id]);
      if (result?.updatedIds.length)
        toast.success(`${guest.name} marked as shared.`);
    });
  }

  async function renameGuest(guest: Guest, value: string) {
    const name = value.trim();
    if (!name) {
      toast.error("Enter a child or display name.");
      return false;
    }
    if (name.length > 80) {
      toast.error("Keep names under 80 characters.");
      return false;
    }
    const result = await withBusy("rename", () =>
      run(async () => {
        const updated = await api<{ guest: Guest }>(
          `/api/staff/tickets/${guest.id}`,
          "PATCH",
          { name },
        );
        setGuests((current) =>
          current.map((item) => (item.id === guest.id ? updated.guest : item)),
        );
        toast.success("Name updated. The QR and ticket ID are unchanged.");
        return true;
      }),
    );
    return result === true;
  }

  async function remove(guest: Guest) {
    await withBusy("delete", () =>
      run(async () => {
        await api(`/api/staff/tickets/${guest.id}`, "DELETE");
        setGuests((current) => current.filter((item) => item.id !== guest.id));
        setSelectedId(null);
        toast.success(`${guest.name}'s pass was removed.`);
      }),
    );
  }

  async function signOut() {
    await fetch("/api/session", { method: "DELETE" });
    router.push("/staff/login");
  }

  return {
    guests,
    selected,
    selectedId,
    setSelectedId,
    selectedIds,
    selectedGuests,
    selectedUnused,
    selectedCollected,
    toggleSelected,
    setPageSelected,
    selectMatching,
    clearSelected: () => setSelectedIds([]),
    allVisibleSelected:
      listing.items.length > 0 &&
      listing.items.every((guest) => selectedIds.includes(guest.id)),
    query,
    search,
    composer,
    openComposer: () => setComposer(true),
    closeComposer: () => setComposer(false),
    filter,
    changeFilter,
    visible: listing.items,
    filteredCount: listing.total,
    page: listing.page,
    pageCount: listing.pageCount,
    pageSize: listing.pageSize,
    from: listing.from,
    to: listing.to,
    setPage,
    setPageSize: changePageSize,
    busy,
    ready,
    bulkProgress,
    shareQueue,
    closeShareQueue: () => setShareQueue(null),
    skipQueuedPass: () => void withBusy("queue-skip", () => advanceQueue()),
    ...overview,
    createBatch,
    sharePass,
    copyLink,
    previewPass,
    download,
    downloadSelected,
    startShareQueue,
    shareQueuedPass,
    markQueuedPassShared,
    markSelectedShared,
    markShared,
    renameGuest,
    remove,
    signOut,
  };
}

export type StaffWorkspaceState = ReturnType<typeof useStaffWorkspace>;
