import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      cellWidths={[
        "4rem",
        "20rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
      ]}
      columnCount={8}
      searchCount={1}
    />
  );
}
