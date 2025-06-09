import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={9}
      filterCount={0}
      searchCount={1}
      cellWidths={[
        "4rem",
        "15rem",
        "10rem",
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
