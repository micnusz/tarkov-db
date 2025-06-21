"use client";
import { client } from "@/app/api/client";
import { columnsBackpacks } from "@/components/data-table/columns";
import { DataTableBackpacks } from "@/components/data-table/data-table-backpacks";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const BackpacksPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["backpacks"],
    queryFn: () => client.getBackpacks(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Backpacks
      </h1>
      <DataTableClient
        columns={columnsBackpacks}
        data={data}
        filters={[
          {
            id: "capacity",
            label: "Capacity",
            filterType: "slider",
            min: 6,
            max: 48,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -0.08,
            max: -0.01,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "speedPenalty",
            label: "Speed. Modifier",
            filterType: "slider",
            min: -0.07,
            max: 0,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "turnPenalty",
            label: "Turn Penalty",
            filterType: "slider",
            min: -0.04,
            max: 0,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 142000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.45,
            max: 15,
            step: 1,
            formatter: (val) => `${val}kg`,
          },
        ]}
      />
    </div>
  );
};

export default BackpacksPageClient;
