"use client";
import { client } from "@/app/api/client";
import { ArmorsItem } from "@/app/api/types";
import {
  columnsArmorPlates,
  columnsArmors,
} from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const ArmorPlatesPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["armor-plates"],
    queryFn: () => client.getArmorPlates(),
  });

  const armorClass = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((armor) => armor.properties.class)
        .filter((lvl): lvl is number => lvl !== undefined)
    )
  ).sort((a, b) => a - b);

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Armor Plates
      </h1>
      <DataTableClient
        columns={columnsArmorPlates}
        data={data}
        filters={[
          {
            id: "class",
            label: "Armor Class",
            filterType: "select",
            options: armorClass.map(String),
            formatter: (val) => `Class ${val}`,
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

export default ArmorPlatesPageClient;
