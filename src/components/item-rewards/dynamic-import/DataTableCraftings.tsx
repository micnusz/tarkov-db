import { CraftingProperties } from "@/app/api/types";
import { columnsCrafting } from "@/components/data-table/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import React from "react";

type DataTableCraftingsProps = {
  data: CraftingProperties[];
};
const DataTableCraftings = ({ data }: DataTableCraftingsProps) => {
  return <SimpleDataTable data={data} columns={columnsCrafting} />;
};

export default DataTableCraftings;
