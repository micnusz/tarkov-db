"use client";

import { client } from "@/app/api/client";
import { ItemPropertiesGlasses } from "@/app/api/types";
import { columnsItemPropertiesGlasses } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const Eyewear = () => {
  const { data: itemGlasses } = useSuspenseQuery({
    queryKey: ["facewear-eyewear"],
    queryFn: () => client.getGlasses(),
  });

  const categories = Array.from(
    new Set(
      (itemGlasses as ItemPropertiesGlasses[])
        .map((category) => category.category?.name)
        .filter((category): category is string => category !== undefined)
    )
  ).sort();

  const armorClass = Array.from(
    new Set(
      (itemGlasses as ItemPropertiesGlasses[])
        .map((armor) => armor.properties?.class)
        .filter((lvl): lvl is number => lvl !== undefined)
    )
  ).sort((a, b) => a - b);

  const armorMaterial = Array.from(
    new Set(
      (itemGlasses as ItemPropertiesGlasses[])
        .map((material) => material.properties?.material?.name)
        .filter((material): material is string => material !== undefined)
    )
  ).sort();

  return (
    <div>
      <DataTableClient
        data={itemGlasses}
        columns={columnsItemPropertiesGlasses}
        filters={[
          {
            id: "category",
            label: "Category",
            filterType: "select",
            options: categories,
            formatter: UniversalFormat,
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
            id: "blindnessProtection",
            label: "Blindness Protection",
            filterType: "slider",
            min: 0,
            max: 0.1,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.03,
            max: 1.8,
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

export default Eyewear;
