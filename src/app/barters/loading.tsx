import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={4}
      filterCount={0}
      searchCount={1}
      cellWidths={["4rem", "15rem", "4rem", "15rem"]}
      shrinkZero
    />
  );
}
