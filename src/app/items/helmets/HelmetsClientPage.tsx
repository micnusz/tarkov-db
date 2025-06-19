"use client";

import { client } from "@/app/api/client";
import { ArmorsItem } from "@/app/api/types";
import {
  columnsHeadsets,
  columnsHelmets,
} from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import RicochetChanceFormat from "@/components/modules/ricochet-chance-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const HelmetsClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["helmets"],
    queryFn: () => client.getHelmets(),
  });

  const armorClass = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((armor) => armor.properties?.class)
        .filter((lvl): lvl is number => lvl !== undefined)
    )
  ).sort((a, b) => a - b);

  const armorMaterial = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((material) => material.properties?.material?.name)
        .filter((material): material is string => material !== undefined)
    )
  ).sort();

  const ricochetValues = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((item) => item.properties?.ricochetY)
        .filter((value): value is number => value !== undefined)
    )
  ).sort((a, b) => a - b);

  const ricochetLabels = Array.from(
    new Set(ricochetValues.map(RicochetChanceFormat))
  ).sort();

  const blocksHeadset = Array.from(
    new Set(
      (data as ArmorsItem[])
        .map((headset) => headset.properties?.blocksHeadset)
        .filter((value): value is boolean => value !== undefined)
        .map((val) => (val ? "Blocks" : "Allows"))
    )
  ).sort();

  console.log(blocksHeadset);

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Helmets
      </h1>
      <DataTableClient
        columns={columnsHelmets}
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
            id: "material",
            label: "Armor Material",
            filterType: "select",
            options: armorMaterial.map(String),
            formatter: UniversalFormat,
          },
          {
            id: "ricochet",
            label: "Ricochet Chance",
            filterType: "select",
            options: ricochetLabels,
            formatter: UniversalFormat,
          },
          {
            id: "durability",
            label: "Durability",
            filterType: "slider",
            min: 30,
            max: 180,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "blocksHeadset",
            label: "Headset",
            filterType: "select",
            options: blocksHeadset,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.3,
            max: 4.5,
            step: 0.1,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "ergoPenalty",
            label: "Ergo Penalty",
            filterType: "slider",
            min: -5,
            max: 0,
            step: 0.1,
            formatter: (val) => `${val}%`,
          },
          {
            id: "speedPenalty",
            label: "Speed Penalty",
            filterType: "slider",
            min: -2,
            max: 0,
            step: 0.1,
            formatter: (val) => `${val}%`,
          },
          {
            id: "turnPenalty",
            label: "Turn Penalty",
            filterType: "slider",
            min: -10,
            max: 0,
            step: 0.1,
            formatter: (val) => `${val}%`,
          },
        ]}
      />
    </div>
  );
};

export default HelmetsClientPage;
