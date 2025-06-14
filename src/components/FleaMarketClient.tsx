"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTableFleaMarket } from "./data-table/data-table-flea";
import { columnsFlea } from "./data-table/columns";

const FleaMarketClient = () => {
  const { data: itemsFlea } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: () => client.getItems(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <DataTableFleaMarket data={itemsFlea} columns={columnsFlea} />
    </div>
  );
};

export default FleaMarketClient;
