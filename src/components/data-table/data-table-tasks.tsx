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
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Task } from "@/app/api/types";
import PopoverFilter from "../popover-filter";
import DataTableSearchClient from "./data-table-search-client";
import { DataTablePaginationClient } from "./data-table-pagination-client";

interface DataTableTasksProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTableTasks<TData extends Task, TValue>({
  columns,
  data,
}: DataTableTasksProps<TData, TValue>) {
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
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="w-full flex flex-col gap-4 ">
        <div className="flex items-center py-4">
          <DataTableSearchClient table={table} />
          <Button
            variant="secondary"
            size="sm"
            className="mx-2"
            onClick={() => {
              setSelectedMap(null);
              setSelectedTrader(null);
              setColumnFilters([]);
              table.resetColumnFilters();
            }}
          >
            Clear
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-wrap gap-2">
            <PopoverFilter
              label="Trader"
              value={selectedTrader}
              onChange={(val) => {
                setSelectedTrader(val);
                setColumnFilters((prev) =>
                  val
                    ? [
                        ...prev.filter((f) => f.id !== "trader"),
                        { id: "trader", value: val },
                      ]
                    : prev.filter((f) => f.id !== "trader")
                );
              }}
              options={tasks}
              formatter={(v) => v}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <PopoverFilter
              label="Map"
              value={selectedMap}
              onChange={(val) => {
                setSelectedMap(val);
                setColumnFilters((prev) =>
                  val
                    ? [
                        ...prev.filter((f) => f.id !== "map.name"),
                        { id: "map.name", value: val },
                      ]
                    : prev.filter((f) => f.id !== "map.name")
                );
              }}
              options={maps}
              formatter={(v) => v}
            />
          </div>
        </div>

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
