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

interface DataTableWeaponsProps<WeaponItem, TValue> {
  columns: ColumnDef<WeaponItem, TValue>[];
  data: WeaponItem[];
}

export function DataTableWeapons<WeaponItem, TValue>({
  columns,
  data,
}: DataTableWeaponsProps<WeaponItem, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedCaregory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(
    new Set(
      data
        .map((item) => item.category?.name)
        .filter((name): name is string => Boolean(name))
    )
  ).sort();
  const clearFilters = () => {
    setColumnFilters([]);
    setSelectedCategory(null);
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
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCaregory === category ? "default" : "outline"}
              size="sm"
              onPointerDown={() => {
                if (selectedCaregory === category) {
                  clearFilters();
                } else {
                  setSelectedCategory(category);
                  setColumnFilters((prev) => [
                    ...prev.filter((f) => f.id !== "category"),
                    { id: "category", value: category },
                  ]);
                }
              }}
            >
              {category}
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
