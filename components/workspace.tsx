"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronRight,
  Download,
  Gift,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  Share2,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Brand } from "./brand";
import { api, SessionExpired } from "@/lib/browser-api";
import { createPassArtwork, downloadArtwork } from "@/lib/pass-art";
import type { Guest } from "@/lib/tickets";

type PassPayload = { guest: Guest; token: string; url: string };

function statusLabel(guest: Guest) {
  if (guest.status === "redeemed") return "Collected";
  return guest.sharedAt ? "Pass sent" : "Not shared";
}

export function Workspace({ demo }: { demo: boolean }) {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState(false);
  const [names, setNames] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const selected = guests.find((guest) => guest.id === selectedId) || null;
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return guests;
    return guests.filter((guest) =>
      `${guest.name} ${guest.number}`.toLowerCase().includes(needle),
    );
  }, [guests, query]);
  const collected = guests.filter(
    (guest) => guest.status === "redeemed",
  ).length;
  const sent = guests.filter((guest) => guest.sharedAt).length;

  async function run<T>(work: () => Promise<T>) {
    try {
      setNotice("");
      return await work();
    } catch (error) {
      if (error instanceof SessionExpired) {
        router.push("/staff/login?next=/staff");
        return;
      }
      setNotice(
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
          router.push("/staff/login?next=/staff");
        else
          setNotice(
            error instanceof Error ? error.message : "Could not load guests.",
          );
      });
    return () => {
      active = false;
    };
  }, [router]);

  async function createBatch() {
    const clean = names
      .split("\n")
      .map((name) => name.trim())
      .filter(Boolean);
    if (!clean.length) return setNotice("Add at least one child’s name.");
    setBusy(true);
    await run(async () => {
      const result = await api<{ guests: Guest[] }>(
        "/api/staff/tickets",
        "POST",
        {
          names: clean,
          batchId: crypto.randomUUID(),
        },
      );
      setNames("");
      setComposer(false);
      await refresh();
      setSelectedId(result.guests[0]?.id || null);
      setNotice(
        `${result.guests.length} pass${result.guests.length === 1 ? "" : "es"} created.`,
      );
    });
    setBusy(false);
  }

  async function getPass(guest: Guest) {
    return run(() => api<PassPayload>(`/api/staff/tickets/${guest.id}/pass`));
  }

  async function markShared(guest: Guest) {
    await run(async () => {
      await api(`/api/staff/tickets/${guest.id}`, "PATCH", { shared: true });
      setGuests((current) =>
        current.map((item) =>
          item.id === guest.id
            ? { ...item, sharedAt: new Date().toISOString() }
            : item,
        ),
      );
    });
  }

  async function share(guest: Guest) {
    setBusy(true);
    const pass = await getPass(guest);
    if (pass) {
      const files = await createPassArtwork(pass);
      const message = `${guest.name}, your invitation and one-time gift pass for Mohammed Aadil’s football party are attached. Please keep the QR private and bring it to the gift table.`;
      if (navigator.share && navigator.canShare?.({ files })) {
        try {
          await navigator.share({
            title: `${guest.name} · Aadil’s Matchday`,
            text: message,
            files,
          });
          await markShared(guest);
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError")
            setNotice("Share cancelled — nothing was marked as sent.");
          else
            setNotice(
              "Your browser could not share the files. Download them instead.",
            );
        }
      } else {
        files.forEach(downloadArtwork);
        setNotice(
          "Two images downloaded. Attach both in WhatsApp, then mark the pass sent.",
        );
      }
    }
    setBusy(false);
  }

  async function download(guest: Guest) {
    setBusy(true);
    const pass = await getPass(guest);
    if (pass) (await createPassArtwork(pass)).forEach(downloadArtwork);
    setBusy(false);
  }

  async function remove(guest: Guest) {
    const label = guest.isDemo ? "this sample guest" : "this unused guest";
    if (
      !window.confirm(`Delete ${label}, ${guest.name}? This cannot be undone.`)
    )
      return;
    await run(async () => {
      await api(`/api/staff/tickets/${guest.id}`, "DELETE");
      setGuests((current) => current.filter((item) => item.id !== guest.id));
      setSelectedId(null);
      setNotice(`${guest.name} deleted.`);
    });
  }

  async function signOut() {
    await fetch("/api/session", { method: "DELETE" });
    router.push("/staff/login");
  }

  return (
    <main className="workspace-shell">
      <header className="workspace-header">
        <Brand />
        <div className="header-actions">
          {demo && <span className="demo-chip">LOCAL DEMO</span>}
          <button
            className="icon-button"
            onClick={signOut}
            aria-label="Sign out"
          >
            <LogOut />
          </button>
        </div>
      </header>

      <section className="workspace-intro">
        <div>
          <span className="eyebrow">AADIL’S MATCHDAY · GIFT DESK</span>
          <h1>
            Every name.
            <br />
            <i>One good surprise.</i>
          </h1>
        </div>
        <button className="button primary" onClick={() => setComposer(true)}>
          <Plus /> Add guests
        </button>
      </section>

      <section className="score-strip" aria-label="Guest overview">
        <div>
          <strong>{guests.length}</strong>
          <span>
            <Users /> Guests
          </span>
        </div>
        <div>
          <strong>{sent}</strong>
          <span>
            <MessageCircle /> Passes sent
          </span>
        </div>
        <div>
          <strong>{collected}</strong>
          <span>
            <Gift /> Gifts collected
          </span>
        </div>
        <div className="remaining">
          <strong>{guests.length - collected}</strong>
          <span>Still to collect</span>
        </div>
      </section>

      {notice && (
        <p className="notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X />
          </button>
        </p>
      )}

      <section className="guest-workspace">
        <div className="guest-list-panel">
          <div className="list-heading">
            <div>
              <span className="eyebrow">TEAM SHEET</span>
              <h2>Guest passes</h2>
            </div>
            <span>{visible.length}</span>
          </div>
          <label className="search-field">
            <Search />
            <span className="sr-only">Search guests</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or pass number"
            />
          </label>
          <div className="guest-list">
            {!visible.length ? (
              <div className="empty-state">
                <p>No guests match that search.</p>
              </div>
            ) : (
              visible.map((guest) => (
                <button
                  className={`guest-row ${selectedId === guest.id ? "active" : ""}`}
                  key={guest.id}
                  onClick={() => setSelectedId(guest.id)}
                >
                  <span className="guest-monogram">
                    {guest.name.slice(0, 1)}
                  </span>
                  <span className="guest-copy">
                    <strong>{guest.name}</strong>
                    <small>{guest.number}</small>
                  </span>
                  <span
                    className={`status ${guest.status === "redeemed" ? "redeemed" : guest.sharedAt ? "shared" : "unused"}`}
                  >
                    {statusLabel(guest)}
                  </span>
                  <ChevronRight />
                </button>
              ))
            )}
          </div>
        </div>

        <aside className={`guest-detail ${selected ? "open" : ""}`}>
          {selected ? (
            <>
              <button
                className="detail-close"
                onClick={() => setSelectedId(null)}
                aria-label="Close guest details"
              >
                <X />
              </button>
              <span className="eyebrow">PERSONAL PASS</span>
              <div className="player-number">
                {String(guests.indexOf(selected) + 1).padStart(2, "0")}
              </div>
              <h2>{selected.name}</h2>
              <p>{selected.number}</p>
              <span
                className={`status large ${selected.status === "redeemed" ? "redeemed" : selected.sharedAt ? "shared" : "unused"}`}
              >
                {statusLabel(selected)}
              </span>
              <div className="detail-actions">
                <button
                  className="button primary"
                  disabled={busy}
                  onClick={() => share(selected)}
                >
                  <Share2 /> Share invitation + pass
                </button>
                <button
                  className="button secondary"
                  disabled={busy}
                  onClick={() => download(selected)}
                >
                  <Download /> Download both images
                </button>
                <Link
                  className="text-action"
                  href={`/api/staff/tickets/${selected.id}/pass`}
                  onClick={(event) => {
                    event.preventDefault();
                    void getPass(selected).then(
                      (pass) =>
                        pass &&
                        window.open(
                          `/redeem/${pass.token}`,
                          "_blank",
                          "noopener,noreferrer",
                        ),
                    );
                  }}
                >
                  Open staff scan review <ChevronRight />
                </Link>
                {!selected.sharedAt && (
                  <button
                    className="text-action"
                    onClick={() => markShared(selected)}
                  >
                    <Check /> Mark as sent
                  </button>
                )}
                {(selected.status === "unused" || selected.isDemo) && (
                  <button
                    className="text-action danger"
                    onClick={() => remove(selected)}
                  >
                    <Trash2 /> Delete {selected.isDemo ? "sample" : "guest"}
                  </button>
                )}
              </div>
              <p className="privacy-note">
                The QR is private. Sharing it gives access to this child’s
                one-time gift claim.
              </p>
            </>
          ) : (
            <div className="detail-empty">
              <span>10</span>
              <h2>
                Pick a name
                <br />
                from the team sheet.
              </h2>
              <p>Then share, download, or check their pass.</p>
            </div>
          )}
        </aside>
      </section>

      <footer className="page-foot">
        ONE PASS. ONE GIFT. <span>✳</span> NO DOUBLE COLLECTIONS.
      </footer>

      {composer && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setComposer(false)
          }
        >
          <section
            className="composer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="composer-title"
          >
            <button
              className="detail-close"
              onClick={() => setComposer(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <span className="eyebrow">ADD TO THE TEAM SHEET</span>
            <h2 id="composer-title">One child per line.</h2>
            <p>
              Duplicate names are allowed — check them carefully before sharing.
            </p>
            <textarea
              autoFocus
              value={names}
              onChange={(event) => setNames(event.target.value)}
              placeholder={"Adil Lawal\nZara Bello\nTobi Okafor"}
              rows={8}
            />
            <div className="composer-foot">
              <span>
                {names.split("\n").filter((name) => name.trim()).length}/250
                names
              </span>
              <button
                className="button primary"
                disabled={busy}
                onClick={createBatch}
              >
                {busy ? "Creating…" : "Create passes"}
                <Plus />
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
