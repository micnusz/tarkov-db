import React from "react";
import { Input } from "../ui/input";

const DataTableSearchClient = ({ table }) => {
  return (
    <Input
      placeholder="Search"
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("name")?.setFilterValue(event.target.value)
      }
      className="border xs:w-full sm:w-[20rem] md:w-[20rem] duration-200 ease-in-out rounded-md border-3 border-input transition-colors hover:border-chart-1"
    />
  );
};

export default DataTableSearchClient;
