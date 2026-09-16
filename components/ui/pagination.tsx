"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PAGE_SIZE_OPTIONS } from "@/lib/guest";

export function Pagination({
  page,
  pageCount,
  pageSize,
  from,
  to,
  total,
  itemLabel,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
}: {
  page: number;
  pageCount: number;
  pageSize: number;
  from: number;
  to: number;
  total: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: readonly number[];
}) {
  const pageSizeId = useId();
  const canGoPrev = page > 1;
  const canGoNext = page < pageCount;

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted text-xs">
        Showing {from}–{to} of {total} {itemLabel}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center gap-2">
          <Label htmlFor={pageSizeId} className="text-muted tracking-[0.08em]">
            Rows
          </Label>
          <select
            id={pageSizeId}
            className="border-line focus-visible:ring-red/30 h-8 min-w-14 border bg-transparent px-2 text-xs outline-none focus-visible:ring-2"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <p className="text-muted text-xs font-extrabold tracking-wide uppercase">
          Page {page} of {pageCount}
        </p>
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <Button
            type="button"
            variant="outline"
            size="iconSm"
            disabled={!canGoPrev}
            onClick={() => onPageChange(1)}
            aria-label="First page"
            className="hidden lg:inline-flex"
          >
            <ChevronsLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="iconSm"
            disabled={!canGoPrev}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="iconSm"
            disabled={!canGoNext}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="iconSm"
            disabled={!canGoNext}
            onClick={() => onPageChange(pageCount)}
            aria-label="Last page"
            className="hidden lg:inline-flex"
          >
            <ChevronsRight />
          </Button>
        </nav>
      </div>
    </div>
  );
}
