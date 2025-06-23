"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columnsBarterItems } from "../../../components/data-table/columns";
import { DataTableClient } from "../../../components/data-table/data-table-client";
import { Item } from "@/app/api/types";
import UniversalFormat from "../../../components/modules/universal-format";

const BarterItemsClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["barter-items"],
    queryFn: () => client.getBarterItems(),
  });

  const categories = Array.from(
    new Set((data as Item[]).map((category) => category.category?.name))
  ).sort();

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Barter Items
      </h1>
      <DataTableClient
        columns={columnsBarterItems}
        data={data}
        filters={[
          {
            id: "category",
            label: "Category",
            filterType: "select",
            options: categories.map(String),
            formatter: UniversalFormat,
          },
          {
            id: "avg24hPrice",
            label: "Avg. 24h Price",
            filterType: "range",
            formatter: (val) => `${val}`,
          },
        ]}
      />
    </div>
  );
};

export default BarterItemsClientPage;
