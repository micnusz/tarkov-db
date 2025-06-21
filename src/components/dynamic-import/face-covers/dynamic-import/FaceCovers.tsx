"use client";

import { client } from "@/app/api/client";
import { ArmorsItem } from "@/app/api/types";
import { columnsFaceCovers } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import RicochetChanceFormat from "@/components/modules/ricochet-chance-format";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FaceCovers = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["face-covers"],
    queryFn: () => client.getFaceCovers(),
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

  return (
    <div>
      <DataTableClient
        columns={columnsFaceCovers}
        data={data}
        filters={[
          {
            id: "__typename",
            label: "Type",
            filterType: "select",
            options: ["Armored Face Covers"],
          },
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
            filterType: "range",
            formatter: UniversalFormat,
          },
          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -0.05,
            max: 0,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "speedPenalty",
            label: "Speed. Modifier",
            filterType: "slider",
            min: -0.01,
            max: 0,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "turnPenalty",
            label: "Turn Penalty",
            filterType: "slider",
            min: -0.03,
            max: 0,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.05,
            max: 2.1,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },

          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 88000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default FaceCovers;
