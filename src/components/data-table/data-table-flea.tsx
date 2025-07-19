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
import { Input } from "../ui/input";
import { BaseItem, Category } from "@/app/api/types";
import { DataTableSkeleton } from "./data-table-skeleton";
import { Button } from "../ui/button";
import CategoryNameFormat from "../modules/category-name-format";
import Spinner from "@/lib/Spinner";
import PopoverFilter from "../popover-filter";

interface DataTableFleaMarketProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  isLoadingCat: boolean;
  isLoading: boolean;
}
export function DataTableFleaMarket<TData extends BaseItem, TValue>({
  columns,
  data,
  name,
  setName,
  categories,
  selectedCategory,
  setSelectedCategory,
  isLoadingCat,
  isLoading,
}: DataTableFleaMarketProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentMap = new Map();
  categories.forEach((category) => {
    if (category.parent && !parentMap.has(category.parent.id)) {
      parentMap.set(category.parent.id, category.parent);
    }
  });

  const parents = Array.from(parentMap.values());
  const parentNames = parents.map((p) => p.name);

  const isFiltred = name !== "" || selectedCategory !== null;

  return (
    <div>
      <div className="flex items-center py-4">
        {/* Input search */}
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search"
          className=" border xs:w-full sm:w-[20rem] md:w-[20rem] duration-200 ease-in-out rounded-md border-3 border-input transition-colors hover:border-chart-1 "
        />
        {/* Clear fillter button */}
        <Button
          variant={isFiltred ? "destructive" : "muted"}
          className="mx-2"
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
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-2">
            <PopoverFilter
              label="Category"
              value={selectedCategory}
              onChange={(val) => {
                if (val) {
                  const formatted = CategoryNameFormat(val);
                  setSelectedCategory(formatted);
                } else {
                  setSelectedCategory(null);
                }
              }}
              options={parentNames}
              formatter={(val) => val}
            />
          </div>
        )}
      </div>
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="p-0">
                <DataTableSkeleton
                  columnCount={7}
                  filterCount={0}
                  searchCount={0}
                  cellWidths={[
                    "3rem",
                    "8rem",
                    "3rem",
                    "3rem",
                    "3rem",
                    "3rem",
                    "3rem",
                  ]}
                  shrinkZero
                  className="p-0 md:p-0 md:mt-0 m-0"
                />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
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
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
