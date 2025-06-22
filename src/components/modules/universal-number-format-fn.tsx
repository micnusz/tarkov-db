import { Row } from "@tanstack/react-table";

export interface UniversalNumberFormatFnValue {
  min: number | null;
  max: number | null;
}

export const UniversalNumberFormatFn = <TData,>(
  row: Row<TData>,
  id: string,
  filterValue: UniversalNumberFormatFnValue
): boolean => {
  if (!filterValue) return true;

  const cost: number = row.getValue(id);
  const { min, max } = filterValue;

  if (min !== null && cost < min) return false;
  if (max !== null && cost > max) return false;

  return true;
};
