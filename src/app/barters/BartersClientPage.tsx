"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columnsBarter } from "../../components/data-table/columns";
import { Barter } from "@/app/api/types";
import { DataTableClient } from "../../components/data-table/data-table-client";
import formatCurrency from "../../components/modules/currency-format";

const BartersClientPage = () => {
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
        .map((barter) => barter.rewardItems?.[0]?.item?.category?.parent?.name)
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
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Barters
      </h1>
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
            filterType: "slider",
            min: 0,
            max: 15500000,
            step: 1000,
            formatter: (val) => formatCurrency("roubles", val as number),
          },
        ]}
      />
    </div>
  );
};

export default BartersClientPage;
