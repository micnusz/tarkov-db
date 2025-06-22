"use client";

import { client } from "@/app/api/client";
import { ArmorsItem } from "@/app/api/types";
import { columnsArmors } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import UniversalPercentFormat from "@/components/modules/universal-percent-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const BodyArmorsArmoredRigs = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["body-armors-armored-rigs"],
    queryFn: () => client.getArmoredRigs(),
  });

  const traderLevel = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((level) => level.properties.class)
        .filter((lvl): lvl is number => lvl !== undefined)
    )
  ).sort((a, b) => a - b);

  return (
    <div>
      <DataTableClient
        columns={columnsArmors}
        data={data}
        filters={[
          {
            id: "class",
            label: "Armor Lvl",
            filterType: "select",
            options: traderLevel.map(String),
            formatter: (val) => `Level ${val}`,
          },
          {
            id: "durability",
            label: "Durability",
            filterType: "slider",
            min: 70,
            max: 272,
            step: 10,
            formatter: UniversalFormat,
          },

          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -0.07,
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
            min: -0.01,
            max: 0,
            step: 0.01,
            formatter: UniversalPercentFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 1.02,
            max: 12.2,
            step: 0.1,
            formatter: (val) => `${val}kg`,
          },
        ]}
      />
    </div>
  );
};

export default BodyArmorsArmoredRigs;
