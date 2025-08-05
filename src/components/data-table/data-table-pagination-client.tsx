import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationClientProps<TData> {
  table: Table<TData>;
}

export function DataTablePaginationClient<TData>({
  table,
}: DataTablePaginationClientProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const pageCount = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2 mt-4">
      <div className="order-2 md:order-1 w-full md:w-auto flex  md:justify-start">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            className="h-8 rounded border border-gray-300"
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[20, 25, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="order-1 md:order-2 w-full md:w-auto flex items-center justify-center md:justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!canPreviousPage}
          aria-label="Go to first page"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
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
          onClick={() => table.nextPage()}
          disabled={!canNextPage}
          aria-label="Go to next page"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
          aria-label="Go to last page"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
