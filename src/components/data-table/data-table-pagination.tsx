import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface DataTablePaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  onPageChange: (newPageIndex: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export function DataTablePagination({
  pageIndex,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
  canPreviousPage,
  canNextPage,
}: DataTablePaginationProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per Page
          </label>
          <select
            id="rows-per-page"
            className="h-8 rounded border border-gray-300"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[20, 25, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav
        role="navigation"
        aria-label="Pagination navigation"
        className="flex flex-wrap items-center gap-2"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(0)}
          disabled={!canPreviousPage}
          aria-label="Go to first page"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={!canPreviousPage}
          aria-label="Go to previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="text-sm">
          Page {pageIndex + 1} of {pageCount}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={!canNextPage}
          aria-label="Go to next page"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(pageCount - 1)}
          disabled={!canNextPage}
          aria-label="Go to last page"
        >
          <ChevronsRight />
        </Button>
      </nav>
    </div>
  );
}
