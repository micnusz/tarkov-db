import { Row } from "@tanstack/react-table";
import RicochetChanceFormat from "./ricochet-chance-format";

export function ricochetFilterFn<TData>(
  row: Row<TData>,
  id: string,
  filterValue: string
): boolean {
  const rowValue = row.getValue(id) as number;
  const label = RicochetChanceFormat(rowValue);
  return label === filterValue;
}
