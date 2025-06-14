import { client } from "@/app/api/client";
import { columnsBarter } from "@/components/data-table/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type DataTableBartersProps = {
  itemId: string;
};

const DataTableBarters = ({ itemId }: DataTableBartersProps) => {
  const { data: itemBarter } = useSuspenseQuery({
    queryKey: ["item-barter", itemId],
    queryFn: () => client.getItemIdBarters(itemId),
  });

  return (
    <SimpleDataTable
      data={[
        ...(itemBarter.bartersFor || []),
        ...(itemBarter.bartersUsing || []),
      ]}
      columns={columnsBarter}
    />
  );
};

export default DataTableBarters;
