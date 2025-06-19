import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={7}
      filterCount={1}
      searchCount={1}
      cellWidths={["6rem", "20rem", "6rem", "6rem", "6rem", "6rem", "6rem"]}
      shrinkZero
    />
  );
}
