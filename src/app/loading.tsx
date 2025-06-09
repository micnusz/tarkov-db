import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={1}
      shrinkZero
      filterCount={0}
      searchCount={1}
    />
  );
}
