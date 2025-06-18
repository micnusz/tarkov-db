"use client";
import { client } from "@/app/api/client";
import { ArmorsItem } from "@/app/api/types";
import { columnsArmors } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const ArmorsPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["armors"],
    queryFn: () => client.getArmors(),
  });

  const traderLevel = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((level) => level.properties.class)
        .filter((lvl): lvl is number => lvl !== undefined)
    )
  ).sort((a, b) => a - b);

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Body Armor
      </h1>
      <DataTableClient
        columns={columnsArmors}
        data={data}
        filters={[
          {
            id: "__typename",
            label: "Type",
            filterType: "select",
            options: ["Armor vests", "Armored chest rigs"],
          },
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
            filterType: "range",
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "range",
            formatter: (val) => `${val}kg`,
          },
          {
            id: "ergoPenalty",
            label: "Ergo Penalty",
            filterType: "range",
            formatter: UniversalFormat,
          },
          {
            id: "speedPenalty",
            label: "Speed Penalty",
            filterType: "range",
            formatter: UniversalFormat,
          },
          {
            id: "turnPenalty",
            label: "Turn Penalty",
            filterType: "range",
            formatter: UniversalFormat,
          },
        ]}
      />
    </div>
  );
};

export default ArmorsPageClient;
