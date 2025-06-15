import { HeaderContext } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import {
  ContextMenuContent,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuTrigger,
} from "./context-menu";

type DefaultHeaderProps<TData, TValue> = {
  info: HeaderContext<TData, TValue>;
  name: string;
};

export default function DefaultHeader<TData, TValue>({
  info,
  name,
}: DefaultHeaderProps<TData, TValue>) {
  const sorted = info.column.getIsSorted();
  const { table } = info;

  return (
    <div className="h-[4rem] ">
      <ContextMenu>
        <ContextMenuTrigger
          className="flex w-full h-full items-center gap-4 cursor-pointer"
          onPointerDown={(e) => {
            e.preventDefault();
            if (e.button == 2) return;
            info.column.toggleSorting(info.column.getIsSorted() === "asc");
          }}
        >
          {name}
          {sorted == "asc" && <ChevronUp size={16} />}
          {sorted == "desc" && <ChevronDown size={16} />}
        </ContextMenuTrigger>
        <ContextMenuContent>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <ContextMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </ContextMenuCheckboxItem>
            ))}
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
