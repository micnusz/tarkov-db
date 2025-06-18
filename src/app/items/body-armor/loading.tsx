import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={9}
      filterCount={0}
      searchCount={1}
      cellWidths={[
        "4rem",
        "16rem",
        "4rem",
        "4rem",
        "4rem",
        "4rem",
        "4rem",
        "4rem",
        "4rem",
      ]}
      shrinkZero
    />
  );
}
