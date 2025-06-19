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
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import DataTableSearchClient from "./data-table-search-client";
import { DataTablePaginationClient } from "./data-table-pagination-client";
import PopoverFilter from "../popover-filter";
import { useTableFilters } from "@/hooks/UseTableFilters";
import { SliderFilterCombobox } from "../slider-filter-combobox";
import RangeFilter from "../range-filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { X } from "lucide-react";
type FilterValue =
  | string
  | number
  | null
  | { min: number | null; max: number | null };

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
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { state: filterState, dispatch } = useTableFilters(
    filters?.map((f) => f.id!).filter(Boolean) ?? []
  );

  const handleFilterChange = (id: string, value: FilterValue) => {
    dispatch({ type: "SET_FILTER", id, value });
    setColumnFilters((prev) =>
      value === null
        ? prev.filter((f) => f.id !== id)
        : [...prev.filter((f) => f.id !== id), { id, value }]
    );
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
            variant="outline"
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
            className="[&>button]:hidden w-screen md:w-[540px] md:max-h-[31rem] border-2 my-17 md:my-24 md:mx-10 bg-table-row/95 rounded-md "
          >
            <SheetHeader>
              <div className="flex items-center justify-between p-2 rounded-md">
                <SheetTitle>Filter by:</SheetTitle>
                <SheetClose
                  className="p-2 rounded-md hover:bg-muted transition"
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
                          filterState[filter.id!] ?? { min: null, max: null }
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
                        value={filterState[filter.id!] ?? null}
                        onChange={(val) => handleFilterChange(filter.id!, val)}
                        formatter={filter.formatter}
                      />
                    );
                  } else if (filter.filterType === "range") {
                    return (
                      <RangeFilter
                        key={filter.id}
                        label={filter.label ?? ""}
                        min={filter.min ?? 0}
                        max={filter.max ?? 100}
                        formatter={filter.formatter}
                        value={
                          filterState[filter.id] ?? { min: null, max: null }
                        }
                        onChange={(val) => handleFilterChange(filter.id!, val)}
                        showClear={true}
                      />
                    );
                  }
                })}
                <Button
                  className="my-4 w-full text-foreground hover:text-foreground/60"
                  variant="secondary"
                  size="sm"
                  onClick={handleResetFilters}
                >
                  Clear
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Table>
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
        <DataTablePaginationClient table={table} />
      </div>
    </>
  );
}
