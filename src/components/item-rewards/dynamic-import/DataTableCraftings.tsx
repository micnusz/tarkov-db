import { client } from "@/app/api/client";
import { CraftingProperties } from "@/app/api/types";
import { columnsCrafting } from "@/components/data-table/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type DataTableCraftingsProps = {
  itemId: string;
};
const DataTableCraftings = ({ itemId }: DataTableCraftingsProps) => {
  const { data: itemCrafting } = useSuspenseQuery({
    queryKey: ["item-crafting", itemId],
    queryFn: () => client.getItemIdBarters(itemId),
  });

  return (
    <SimpleDataTable
      data={[
        ...(itemCrafting.craftsFor || []),
        ...(itemCrafting.craftsUsing || []),
      ]}
      columns={columnsCrafting}
    />
  );
};

export default DataTableCraftings;
