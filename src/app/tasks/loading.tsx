import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={6}
      filterCount={0}
      searchCount={1}
      cellWidths={["3rem", "10rem", "6rem", "3rem", "3rem", "3rem"]}
      shrinkZero
    />
  );
}
