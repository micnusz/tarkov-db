import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={7}
      filterCount={1}
      searchCount={1}
      cellWidths={["6rem", "15rem", "6rem", "6rem", "3rem", "3rem", "3rem"]}
      shrinkZero
    />
  );
}
