import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      cellWidths={[
        "6rem",
        "30rem",
        "15rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
      ]}
      columnCount={11}
      filterCount={10}
      searchCount={1}
    />
  );
}
