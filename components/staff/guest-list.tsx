"use client";

import { ChevronRight, Search } from "lucide-react";
import type { KeyboardEvent } from "react";
import { StaffListSkeleton } from "@/components/staff/staff-skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StaffWorkspaceState } from "@/hooks/use-staff-workspace";
import {
  LIST_FILTERS,
  guestAvatarMark,
  guestListLabel,
  guestStatusClass,
  guestStatusLabel,
} from "@/lib/guest";
import { cn } from "@/lib/utils";

const statusTone = {
  unused: "bg-[#e5ddd0] text-[#5b554d]",
  shared: "bg-[#f7df8d] text-[#654b00]",
  redeemed: "bg-[#cee6dc] text-green",
};

export function GuestList({
  query,
  search,
  filter,
  changeFilter,
  visible,
  filteredCount,
  page,
  pageCount,
  pageSize,
  from,
  to,
  setPage,
  setPageSize,
  selectedId,
  setSelectedId,
  selectedIds,
  toggleSelected,
  setPageSelected,
  allVisibleSelected,
  ready,
}: Pick<
  StaffWorkspaceState,
  | "query"
  | "search"
  | "filter"
  | "changeFilter"
  | "visible"
  | "filteredCount"
  | "page"
  | "pageCount"
  | "pageSize"
  | "from"
  | "to"
  | "setPage"
  | "setPageSize"
  | "selectedId"
  | "setSelectedId"
  | "selectedIds"
  | "toggleSelected"
  | "setPageSelected"
  | "allVisibleSelected"
  | "ready"
>) {
  function selectGuest(id: string) {
    setSelectedId(id);
  }

  function onRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectGuest(id);
    }
  }

  return (
    <div className="px-gutter min-w-0 py-[clamp(1.5rem,4vw,3.5rem)]">
      <div className="mb-5">
        <p className="text-red text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
          Admin list
        </p>
        <h2 className="font-display mt-1 text-[clamp(2rem,3vw,3rem)] leading-[0.95] uppercase">
          Invitation passes
        </h2>
      </div>
      <label className="border-ink flex items-center gap-3 border-b py-2.5">
        <Search className="text-ink size-4" />
        <span className="sr-only">Search guests</span>
        <input
          value={query}
          onChange={(event) => search(event.target.value)}
          placeholder="Search guest or pass number"
          className="placeholder:text-muted w-full border-0 bg-transparent text-[0.9rem] outline-none"
        />
      </label>
      <div className="flex min-w-0 items-center gap-2 py-3">
        <fieldset
          className="flex min-w-0 flex-1 [scrollbar-width:none] gap-1.5 overflow-x-auto border-0 p-0 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Filter invitation passes"
        >
          {LIST_FILTERS.map(([value, label]) => (
            <button
              type="button"
              className={cn(
                "min-h-[2.35rem] shrink-0 rounded-full border px-3 py-2 text-[0.65rem] font-extrabold tracking-[0.04em] uppercase",
                filter === value
                  ? "border-ink bg-ink text-white"
                  : "border-line text-muted bg-transparent",
              )}
              key={value}
              onClick={() => changeFilter(value)}
            >
              {label}
            </button>
          ))}
        </fieldset>
        {visible.length ? (
          <button
            type="button"
            className={cn(
              "min-h-[2.35rem] shrink-0 rounded-full border px-3 py-2 text-[0.6rem] font-extrabold tracking-[0.04em] uppercase",
              allVisibleSelected
                ? "border-ink bg-ink text-white"
                : "border-line text-muted bg-transparent",
            )}
            onClick={() => setPageSelected(!allVisibleSelected)}
          >
            {allVisibleSelected ? "Deselect page" : "Select page"}
          </button>
        ) : null}
      </div>
      <div className="mt-3">
        {!ready ? (
          <StaffListSkeleton />
        ) : !visible.length ? (
          <p className="text-muted px-4 py-16 text-center">
            {query || filter !== "all"
              ? "No guests match that search."
              : "No passes yet. Create a batch to start."}
          </p>
        ) : (
          <Table>
            <TableCaption className="sr-only">Invitation passes</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent data-[state=selected]:border-l-0 data-[state=selected]:bg-transparent">
                <TableHead className="w-9">
                  <Checkbox
                    checked={allVisibleSelected}
                    onCheckedChange={(checked) =>
                      setPageSelected(checked === true)
                    }
                    aria-label="Select passes on this page"
                  />
                </TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Pass</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-4">
                  <span className="sr-only">Open</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((guest) => {
                const checked = selectedIds.includes(guest.id);
                return (
                  <TableRow
                    key={guest.id}
                    tabIndex={0}
                    data-state={
                      selectedId === guest.id ? "selected" : undefined
                    }
                    aria-selected={selectedId === guest.id}
                    className="focus-visible:bg-line/40 cursor-pointer outline-none"
                    onClick={() => selectGuest(guest.id)}
                    onKeyDown={(event) => onRowKeyDown(event, guest.id)}
                  >
                    <TableCell className="w-9">
                      <Checkbox
                        checked={checked}
                        onClick={(event) => event.stopPropagation()}
                        onCheckedChange={() => toggleSelected(guest.id)}
                        aria-label={`Select ${guestListLabel(guest)}`}
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="font-display bg-ink grid size-[2.25rem] shrink-0 place-items-center rounded-full text-[0.78rem] text-white">
                          {guestAvatarMark(guest)}
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="sr-only">{guest.name}</span>
                          <strong className="truncate text-[0.9rem] font-bold">
                            {guestListLabel(guest)}
                          </strong>
                          <small className="text-muted mt-0.5 font-mono text-[0.66rem] tracking-wide md:hidden">
                            {guest.number}
                          </small>
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="text-muted py-4 font-mono text-[0.68rem] tracking-wide max-md:hidden">
                      {guest.number}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={cn(
                          "inline-flex w-fit rounded-full px-2.5 py-1 text-[0.62rem] font-extrabold tracking-[0.04em] uppercase",
                          statusTone[guestStatusClass(guest)],
                        )}
                      >
                        {guestStatusLabel(guest)}
                      </span>
                    </TableCell>
                    <TableCell className="w-4">
                      <ChevronRight className="text-muted size-3.5" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      {filteredCount > 0 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          pageSize={pageSize}
          from={from}
          to={to}
          total={filteredCount}
          itemLabel="guests"
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
