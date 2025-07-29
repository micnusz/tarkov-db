import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={10}
      filterCount={0}
      searchCount={1}
      cellWidths={[
        "7rem",
        "30rem",
        "6rem",
        "6rem",
        "6rem",
        "8rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
      ]}
      shrinkZero
    />
  );
}
