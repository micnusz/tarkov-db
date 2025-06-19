import { Row } from "@tanstack/react-table";

export interface PercentageRangeValue {
  min: number | null;
  max: number | null;
}
export function universalPenaltyFilter<TData>(
  row: Row<TData>,
  id: string,
  filterValue: PercentageRangeValue
): boolean {
  if (!filterValue) return true;

  const raw = row.getValue(id) as number;
  const percent = raw * 100;
  const { min, max } = filterValue;

  if (min !== null && percent < min) return false;
  if (max !== null && percent > max) return false;

  return true;
}
