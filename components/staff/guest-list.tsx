"use client";

import { ChevronRight, Search } from "lucide-react";
import type { KeyboardEvent } from "react";
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
import { LIST_FILTERS, guestStatusClass, guestStatusLabel } from "@/lib/guest";
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
    <div className="px-gutter py-[clamp(1.5rem,4vw,3.5rem)]">
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
      <fieldset
        className="flex scrollbar-none gap-1.5 overflow-x-auto border-0 p-0 py-3"
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
      <div className="mt-3">
        {!visible.length ? (
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
                <TableHead>Guest</TableHead>
                <TableHead>Pass</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-4">
                  <span className="sr-only">Open</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((guest) => (
                <TableRow
                  key={guest.id}
                  tabIndex={0}
                  data-state={selectedId === guest.id ? "selected" : undefined}
                  aria-selected={selectedId === guest.id}
                  className="focus-visible:bg-line/40 cursor-pointer outline-none"
                  onClick={() => selectGuest(guest.id)}
                  onKeyDown={(event) => onRowKeyDown(event, guest.id)}
                >
                  <TableCell>
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="font-display bg-ink grid size-[2.1rem] shrink-0 place-items-center rounded-full text-white">
                        {guest.name.slice(0, 1)}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <strong className="truncate text-[0.86rem] font-bold">
                          {guest.name}
                        </strong>
                        <small className="text-muted mt-0.5 text-[0.66rem] tracking-wide md:hidden">
                          {guest.number}
                        </small>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-muted text-[0.66rem] tracking-wide max-md:hidden">
                    {guest.number}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex w-fit rounded-full px-2 py-1 text-[0.59rem] font-extrabold tracking-wide uppercase max-[480px]:text-[0.5rem]",
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
              ))}
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
