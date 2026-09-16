"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { api, SessionExpired, staffLoginPath } from "@/lib/browser-api";
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
  "create" | "share" | "copy" | "preview" | "download" | "delete" | null;

export function useStaffWorkspace() {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState(false);
  const [filter, setFilter] = useState<ListFilter>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(GUEST_PAGE_SIZE);
  const [busy, setBusy] = useState<StaffBusy>(null);
  const [ready, setReady] = useState(false);

  const selected = guests.find((guest) => guest.id === selectedId) || null;
  const filtered = useMemo(
    () => filterGuests(guests, query, filter),
    [filter, guests, query],
  );
  const listing = paginateGuests(filtered, page, pageSize);
  const overview = guestOverview(guests);

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

  async function markShared(guest: Guest) {
    return run(async () => {
      await api(`/api/staff/tickets/${guest.id}`, "PATCH", { shared: true });
      setGuests((current) =>
        current.map((item) =>
          item.id === guest.id
            ? { ...item, sharedAt: new Date().toISOString() }
            : item,
        ),
      );
      return true;
    });
  }

  async function sharePass(guest: Guest) {
    await withBusy("share", async () => {
      const pass = await getPass(guest);
      if (!pass) return;
      const text = passShareText(guest.name, pass.passUrl);
      const payload = {
        title: invitationShareTitle(guest.name),
        text: passShareMessage(guest.name),
        url: pass.passUrl,
      };
      try {
        if (typeof navigator.share === "function") {
          await navigator.share(
            navigator.canShare?.(payload) ? payload : { text },
          );
          if (await markShared(guest))
            toast.success("Share completed. Pass marked as shared.");
        } else {
          window.open(whatsappShareHref(text), "_blank", "noopener,noreferrer");
          toast.info(
            "WhatsApp opened. Mark as shared after you send the pass.",
          );
        }
      } catch (error) {
        if (!(error instanceof Error && error.name === "AbortError")) {
          window.open(whatsappShareHref(text), "_blank", "noopener,noreferrer");
          toast.info(
            "WhatsApp opened. Mark as shared after you send the pass.",
          );
        }
      }
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

  async function remove(guest: Guest) {
    await withBusy("delete", () =>
      run(async () => {
        await api(`/api/staff/tickets/${guest.id}`, "DELETE");
        setGuests((current) => current.filter((item) => item.id !== guest.id));
        setSelectedId(null);
        toast.success(`${guest.name} deleted.`);
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
    ...overview,
    createBatch,
    sharePass,
    copyLink,
    previewPass,
    download,
    markShared,
    remove,
    signOut,
  };
}

export type StaffWorkspaceState = ReturnType<typeof useStaffWorkspace>;
