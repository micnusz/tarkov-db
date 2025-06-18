"use client";

import { client } from "@/app/api/client";
import { ArmorsItem, Item } from "@/app/api/types";
import {
  columnsBarterItems,
  columnsFaceCovers,
} from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import RicochetChanceFormat from "@/components/modules/ricochet-chance-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FaceCoversClientPage = () => {
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

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Face Covers
      </h1>
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
            options: ricochetValues.map(String),
            formatter: RicochetChanceFormat,
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

export default FaceCoversClientPage;
