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
import { useState } from "react";
import Filters from "./filters";
import { Button } from "./button";
import { AmmoItem } from "@/app/api/types";

interface DataTableAmmoProps<AmmoProperties, TValue> {
  columns: ColumnDef<AmmoProperties, TValue>[];
  data: AmmoProperties[];
}

export function DataTableAmmo<AmmoProperties, TValue>({
  columns,
  data,
}: DataTableAmmoProps<AmmoProperties, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedCaliber, setSelectedCaliber] = useState<string | null>(null);
  const calibers = Array.from(new Set(data.map((ammo) => ammo.caliber))).sort();
  const clearFilters = () => {
    setColumnFilters([]);
    setSelectedCaliber(null);
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
          selectedCaliber={selectedCaliber}
          setSelectedCaliber={setSelectedCaliber}
        />
        <div className="flex flex-wrap gap-2">
          {calibers.map((caliber) => (
            <Button
              key={caliber}
              variant={selectedCaliber === caliber ? "default" : "outline"}
              size="sm"
              onPointerDown={() => {
                if (selectedCaliber === caliber) {
                  clearFilters();
                } else {
                  setSelectedCaliber(caliber);
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== "caliber"),
                    { id: "caliber", value: caliber },
                  ]);
                }
              }}
            >
              {caliber}
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
    </>
  );
}
