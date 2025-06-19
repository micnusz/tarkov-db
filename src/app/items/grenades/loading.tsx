import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={8}
      filterCount={1}
      searchCount={1}
      cellWidths={[
        "6rem",
        "20rem",
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
