"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import React, { useState } from "react";
import { BackpackItem } from "@/app/api/types";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SliderFilterCombobox } from "../slider-filter-combobox";

interface DataTableBackpacksProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTableBackpacks<TData extends BackpackItem, TValue>({
  columns,
  data,
}: DataTableBackpacksProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [ergoPen, setErgoPen] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [speedPen, setSpeedPen] = useState<number | null>(null);
  const [turnPen, setTurnPen] = useState<number | null>(null);
  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="w-full flex flex-col ">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="border xs:w-full sm:w-[20rem] md:w-[20rem] duration-200 ease-in-out rounded-md border-3 border-input transition-colors hover:border-chart-1 "
          />
          <Button
            variant="secondary"
            size="sm"
            className="mx-2"
            onClick={() => {
              table.getColumn("name")?.setFilterValue("");
            }}
          >
            Clear
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className=" ">
            <SliderFilterCombobox
              label="Capacity"
              value={capacity}
              onChange={(val) => {
                setCapacity(val);
                table.getColumn("capacity")?.setFilterValue(val);
              }}
              min={6}
              max={48}
            />
          </div>

          <div>
            <SliderFilterCombobox
              label="Weight"
              value={weight}
              onChange={(val) => {
                setWeight(val);
                table.getColumn("weight")?.setFilterValue(val);
              }}
              min={0.4}
              max={15}
              step={0.1}
              unit="kg"
            />
          </div>

          <div>
            <SliderFilterCombobox
              label="ErgoPen"
              value={ergoPen}
              onChange={(val) => {
                setErgoPen(val);
                table.getColumn("ergoPenalty")?.setFilterValue(val);
              }}
              min={-0.08}
              max={-0.01}
              step={0.01}
              unit="%"
              formatter={(v) => `${Math.round(v * 100)}%`}
            />
          </div>

          <div>
            <SliderFilterCombobox
              label="MoveSpeedPen"
              value={speedPen}
              onChange={(val) => {
                setSpeedPen(val);
                table.getColumn("speedPenalty")?.setFilterValue(val);
              }}
              min={-0.07}
              max={0.0}
              step={0.01}
              unit="%"
              formatter={(v) => `${Math.round(v * 100)}%`}
            />
          </div>

          <div>
            <SliderFilterCombobox
              label="TurnPen"
              value={turnPen}
              onChange={(val) => {
                setTurnPen(val);
                table.getColumn("turnPenalty")?.setFilterValue(val);
              }}
              min={-0.04}
              max={0.0}
              step={0.01}
              unit="%"
              formatter={(v) => `${Math.round(v * 100)}%`}
            />
          </div>
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </>
  );
}
