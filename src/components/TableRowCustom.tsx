import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "./ui/table";
import React from "react";

export const TableRowCustom = React.memo(function TaskTableRow({
  row,
  onSelect,
}: {
  row: ReturnType<(typeof rowModel)["rows"][number]>;
  onSelect: () => void;
}) {
  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      onClick={onSelect}
      className="cursor-pointer"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
});
