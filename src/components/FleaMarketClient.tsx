"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "./ui/data-table";
import { columnsFleaMarket } from "./columns";

const FleaMarketClient = () => {
  const { data: itemsFlea = [] } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: () => client.getItems(),
    staleTime: 300000,
  });

  return (
    <div className="flex flex-col px-6 md:px-20">
      <DataTable data={itemsFlea} columns={columnsFleaMarket} />
    </div>
  );
};

export default FleaMarketClient;
