import React from "react";
import { Input } from "./input";
import { ColumnFiltersState } from "@tanstack/react-table";

type FiltersProps = {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
};

export const Filters = ({ columnFilters, setColumnFilters }: FiltersProps) => {
  const itemName = columnFilters.find((f) => f.id === "name")?.value || "";

  const handleOnFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );
  return (
    <div className="w-1/8 ml-3 my-3">
      <Input
        type="text"
        placeholder="Search"
        value={`${itemName}`}
        onChange={(e) => handleOnFilterChange("name", e.target.value)}
      ></Input>
    </div>
  );
};

export default Filters;
