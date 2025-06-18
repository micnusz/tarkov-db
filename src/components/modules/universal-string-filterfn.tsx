import { Row } from "@tanstack/react-table";

export const UniversalStringFilterFn = <TData,>(
  row: Row<TData>,
  columnId: string,
  filterValue: string
): boolean => {
  if (!filterValue || filterValue === "All") return true;

  const value = row.getValue(columnId);
  return String(value) === filterValue;
};
