import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={12}
      filterCount={1}
      searchCount={1}
      cellWidths={[
        "6rem",
        "24rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
      ]}
      shrinkZero
    />
  );
}
