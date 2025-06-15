"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import React, { Suspense } from "react";
import { Input } from "../ui/input";
import { DataTablePagination } from "./data-table-pagination";
import { BaseItem } from "@/app/api/types";
import { DataTableSkeleton } from "./data-table-skeleton";
import { Button } from "../ui/button";
import CategoryNameFormat from "../modules/category-name-format";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Spinner from "@/lib/Spinner";

interface DataTableFleaMarketProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTableFleaMarket<TData extends BaseItem, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  name,
  setName,
  isLoading,
  categories,
  selectedCategory,
  setSelectedCategory,
  isLoadingCat,
}: DataTableFleaMarketProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentMap = new Map<
    string,
    { id: string; name: string; children: { id: string; name: string }[] }
  >();

  categories.forEach((category) => {
    if (category.parent && !parentMap.has(category.parent.id)) {
      parentMap.set(category.parent.id, category.parent);
    }
  });

  const parents = Array.from(parentMap.values());

  return (
    <div>
      <div className="flex items-center py-4">
        {/* Input search */}
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name..."
          className=" border w-full md:w-[20rem] duration-200 ease-in-out rounded-md border-3 border-input transition-colors hover:border-chart-1 "
        />
        {/* Clear fillter button */}
        <Button
          variant="secondary"
          className="mx-2"
          size="sm"
          onClick={() => {
            setSelectedCategory(null);
            setName("");
          }}
        >
          Clear
        </Button>
      </div>
      {/* Category buttons */}

      <div className="flex gap-2 mb-6 w-full overflow-x-auto">
        {isLoadingCat ? (
          <div className="flex justify-center p-4">
            <Spinner />
          </div>
        ) : (
          <Suspense fallback={<Spinner />}>
            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-md">
                  Category:
                </AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-2 w-full max-w-full">
                  {parents
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((parent) => {
                      const formatted = CategoryNameFormat(parent.name);
                      const isSelected = selectedCategory === formatted;

                      return (
                        <Button
                          key={parent.id}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() =>
                            setSelectedCategory((prev) =>
                              prev === formatted ? null : formatted
                            )
                          }
                        >
                          {parent.name}
                        </Button>
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Suspense>
        )}
      </div>

      {isLoading ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <DataTableSkeleton
                  columnCount={9}
                  filterCount={0}
                  searchCount={0}
                  cellWidths={[
                    "3rem",
                    "15rem",
                    "10rem",
                    "4rem",
                    "4rem",
                    "4rem",
                    "4rem",
                    "4rem",
                    "4rem",
                  ]}
                  shrinkZero
                  className="p-0 md:p-0 m-0 md:m-0"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <DataTablePagination table={table} />
    </div>
  );
}
