"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import { useState } from "react";
import Filters from "./filters";
import TaskDetailsDrawer from "../TaskDetailsDrawer";
import { Button } from "./button";
import { Task } from "@/app/api/types";

interface DataTableTasksProps<Task, TValue> {
  columns: ColumnDef<Task, TValue>[];
  data: Task[];
}

export function DataTableTasks<Task, TValue>({
  columns,
  data,
}: DataTableTasksProps<Task, TValue>) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedRow, setSelectedRow] = useState<Task | null>(null);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const tasks = Array.from(
    new Set(data.map((task) => task.trader.name))
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
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="w-full flex flex-col gap-4 ">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <div className="flex flex-wrap gap-2">
          {tasks.map((trader) => (
            <Button
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setSelectedRow(row.original)}
                  className="cursor-pointer "
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
      </div>
      <TaskDetailsDrawer
        data={selectedRow}
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </>
  );
}
