"use client";

import { client } from "@/app/api/client";
import { columnsChestRigs } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalPercentFormat from "@/components/modules/universal-percent-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const ChestRigsClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["chest-rigs"],
    queryFn: () => client.getChestRigs(),
  });

  const unarmoredRigs = data.filter((item) => !item.types?.includes("armor"));

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Chest Rigs
      </h1>
      <DataTableClient
        columns={columnsChestRigs}
        data={unarmoredRigs}
        filters={[
          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -0.02,
            max: 0,
            step: 0.01,
            formatter: UniversalPercentFormat,
          },
          {
            id: "speedPenalty",
            label: "Speed. Modifier",
            filterType: "slider",
            min: -0.06,
            max: 0,
            step: 0.01,
            formatter: UniversalPercentFormat,
          },
          {
            id: "turnPenalty",
            label: "Turn Penalty",
            filterType: "slider",
            min: -0.03,
            max: 0,
            step: 0.01,
            formatter: UniversalPercentFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.22,
            max: 3.08,
            step: 0.1,
            formatter: (val) => `${val}kg`,
          },
        ]}
      />
    </div>
  );
};

export default ChestRigsClientPage;
