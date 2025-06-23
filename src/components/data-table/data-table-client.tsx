"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "../ui/button";
import DataTableSearchClient from "./data-table-search-client";
import { DataTablePaginationClient } from "./data-table-pagination-client";
import PopoverFilter from "../popover-filter";
import { useTableFilters } from "@/hooks/UseTableFilters";
import { SliderFilterCombobox } from "../slider-filter-combobox";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type FilterValue =
  | string
  | number
  | { min: number | null; max: number | null }
  | null
  | undefined;

interface FilterConfig {
  id?: string;
  label?: string;
  formatter?: (
    value:
      | string
      | number
      | { min: number | null; max: number | null }
      | null
      | undefined
  ) => string;

  options?: string[];
  filterType?: "select" | "slider" | "range";
  min?: number;
  max?: number;
  step?: number;
  showClear?: boolean;
}

interface DataTableClientProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: FilterConfig[];
}
export function DataTableClient<TData, TValue>({
  columns,
  data,
  filters,
}: DataTableClientProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
      columnVisibility: {
        traderLevel: false,
        __typename: false,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { state: filterState, dispatch } = useTableFilters(
    filters?.map((f) => f.id!).filter(Boolean) ?? []
  );

  const handleFilterChange = (id: string, value: FilterValue) => {
    dispatch({ type: "SET_FILTER", id, value });
    setColumnFilters((prev) => {
      const newFilters =
        value === null
          ? prev.filter((f) => f.id !== id)
          : [...prev.filter((f) => f.id !== id), { id, value }];

      return newFilters;
    });
  };

  const handleResetFilters = () => {
    dispatch({ type: "RESET_ALL" });
    setColumnFilters([]);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center pt-4">
          <DataTableSearchClient table={table} />
          <Button
            variant="secondary"
            size="sm"
            className="mx-2"
            onClick={handleResetFilters}
          >
            Clear
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex w-[8rem]" variant="outline">
              Filter by:
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="[&>button]:hidden h-auto max-h-fit w-full md:w-auto border rounded-md overflow-y-auto px-2"
          >
            <SheetHeader>
              <div className="flex items-center justify-between p-2 rounded-md">
                <SheetTitle>Filter by:</SheetTitle>
                <SheetClose
                  className="p-2 rounded-md hover:bg-accent p-2 transition"
                  aria-label="Close"
                >
                  Close
                </SheetClose>
              </div>
            </SheetHeader>
            <div>
              <div className="flex flex-wrap flex-row gap-2  p-2 rounded-md">
                {filters?.map((filter) => {
                  if (!filter.id) return null;
                  if (filter.filterType === "slider") {
                    return (
                      <SliderFilterCombobox
                        key={filter.id}
                        label={filter.label!}
                        min={filter.min ?? 0}
                        max={filter.max ?? 100}
                        step={filter.step ?? 1}
                        value={
                          typeof filterState[filter.id!] === "object" &&
                          filterState[filter.id!] !== null
                            ? (filterState[filter.id!] as {
                                min: number | null;
                                max: number | null;
                              })
                            : { min: null, max: null }
                        }
                        formatter={filter.formatter}
                        onChange={(val) => handleFilterChange(filter.id!, val)}
                        showClear={true}
                      />
                    );
                  } else if (filter.filterType === "select") {
                    return (
                      <PopoverFilter
                        key={filter.id}
                        label={filter.label!}
                        options={filter.options ?? []}
                        value={
                          typeof filterState[filter.id!] === "string" ||
                          typeof filterState[filter.id!] === "number" ||
                          filterState[filter.id!] === null
                            ? (filterState[filter.id!] as
                                | string
                                | number
                                | null)
                            : null
                        }
                        onChange={(val) => handleFilterChange(filter.id!, val)}
                        formatter={filter.formatter}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <Button
                className="px-20 "
                variant="secondary"
                size="sm"
                onClick={handleResetFilters}
              >
                Clear
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <Table className="hidden sm:table">
          <TableHeader className="sticky top-0 z-10 bg-background shadow-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Mobile view */}
        <div className="sm:hidden space-y-4">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <div key={row.id} className="border rounded-md p-4 shadow-sm">
                {(() => {
                  const cells = row.getVisibleCells();
                  const iconCell = cells.find(
                    (cell) => cell.column.id === "icon"
                  );
                  const nameCell = cells.find(
                    (cell) => cell.column.id === "name"
                  );

                  return (
                    <>
                      {/* Ikona + nazwa */}
                      {iconCell && nameCell && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-20 h-20 shrink-0">
                            {flexRender(
                              iconCell.column.columnDef.cell,
                              iconCell.getContext()
                            )}
                          </div>
                          <div className="text-sm font-medium">
                            {flexRender(
                              nameCell.column.columnDef.cell,
                              nameCell.getContext()
                            )}
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {cells
                          .filter((cell) => cell.column.id !== "icon")
                          .map((cell) => {
                            const header = table
                              .getHeaderGroups()
                              .flatMap((hg) => hg.headers)
                              .find((h) => h.column.id === cell.column.id);

                            return (
                              <div
                                key={cell.id}
                                className="py-2 border-b border-b-1"
                              >
                                <div className="text-xs font-semibold uppercase tracking-wide mb-1">
                                  {typeof cell.column.columnDef.header ===
                                  "function"
                                    ? cell.column.columnDef.header(
                                        header!.getContext()
                                      )
                                    : cell.column.columnDef.header}
                                </div>
                                <div className="text-sm ">
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </>
                  );
                })()}
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No results.
            </div>
          )}
        </div>

        <DataTablePaginationClient table={table} />
      </div>
    </>
  );
}
