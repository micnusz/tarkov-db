"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTableBarters } from "./data-table/data-table-barters";
import { columnsBarter } from "./data-table/columns";
import { Barter } from "@/app/api/types";
import { DataTableClient } from "./data-table/data-table-client";
import formatCurrency from "./modules/currency-format";

const BartersClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["barters"],
    queryFn: () => client.getBarters(),
  });

  const traders = Array.from(
    new Set((data as Barter[]).map((trader) => trader.trader.name))
  ).sort();

  const categories = Array.from(
    new Set(
      (data as Barter[])
        .map((barter) => barter.rewardItems?.[0]?.item?.category?.name)
        .filter((name): name is string => Boolean(name))
    )
  );
  const traderLevel = Array.from(
    new Set(
      (data as Barter[])
        .map((item) => item.level)
        .filter((lvl): lvl is number => lvl !== undefined)
    )
  ).sort((a, b) => a - b);

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableClient
        data={data}
        columns={columnsBarter}
        filters={[
          {
            id: "trader",
            label: "Trader",
            filterType: "select",
            options: traders,
          },
          {
            id: "traderLevel",
            label: "Trader Lv",
            filterType: "select",
            options: traderLevel.map(String),
            formatter: (val) => `Level ${val}`,
          },
          {
            id: "category",
            label: "Category",
            filterType: "select",
            options: categories,
          },
          {
            id: "barterCost",
            label: "Barter Cost",
            filterType: "range",
            formatter: (val) => formatCurrency("roubles", val),
          },
        ]}
      />
    </div>
  );
};

export default BartersClient;
