import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={9}
      cellWidths={[
        "5rem",
        "30rem",
        "15rem",
        "3rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
        "6rem",
      ]}
      shrinkZero
      filterCount={1}
    />
  );
}
