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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import Filters from "../ui/filters";
import TaskDetailsDrawer from "../TaskDetailsDrawer";
import { Button } from "../ui/button";
import { Task } from "@/app/api/types";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "../ui/input";

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
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const tasks = Array.from(
    new Set((data as Task[]).map((task) => task.trader.name))
  ).sort();
  const maps = Array.from(
    new Set(
      data
        .map((item) => item.map?.name)
        .filter((name): name is string => Boolean(name))
    )
  ).sort();
  const clearFilters = () => {
    setColumnFilters([]);
    setSelectedTrader(null);
    setSelectedMap(null);
  };

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
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tasks.map((trader) => (
            <Button
              aria-label={`Trader: ${trader}`}
              key={trader}
              variant={selectedTrader === trader ? "default" : "outline"}
              size="sm"
              onPointerDown={() => {
                if (selectedTrader === trader) {
                  clearFilters();
                } else {
                  setSelectedTrader(trader);
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== "trader"),
                    { id: "trader", value: trader },
                  ]);
                }
              }}
            >
              {trader}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {maps.map((mapName) => (
            <Button
              aria-label={`Map: ${mapName}`}
              key={mapName}
              variant={selectedMap === mapName ? "default" : "outline"}
              size="sm"
              onPointerDown={() => {
                if (selectedMap === mapName) {
                  clearFilters();
                } else {
                  setSelectedMap(mapName);
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== "map.name"),
                    { id: "map.name", value: mapName },
                  ]);
                }
              }}
            >
              {mapName}
            </Button>
          ))}
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
                  onClick={() => setSelectedRow(row.original)}
                  className="cursor-pointer"
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
        <DataTablePagination table={table} />
        <TaskDetailsDrawer
          data={selectedRow}
          open={!!selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      </div>
    </>
  );
}
