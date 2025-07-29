import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={11}
      filterCount={1}
      searchCount={1}
      cellWidths={[
        "5rem",
        "10rem",
        "10rem",
        "3rem",
        "3rem",
        "3rem",
        "3rem",
        "3rem",
        "3rem",
        "3rem",
        "3rem",
      ]}
      shrinkZero
    />
  );
}
