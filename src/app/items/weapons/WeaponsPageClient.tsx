"use client";
import { client } from "@/app/api/client";
import { WeaponItem } from "@/app/api/types";
import { columnsWeapon } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import CaliberFormat from "@/components/modules/ammo-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const WeaponsPageClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weapons"],
    queryFn: () => client.getWeapons(),
  });

  const categories = Array.from(
    new Set((data as WeaponItem[]).map((item) => item.category?.name))
  ).sort();

  const caliberList = Array.from(
    new Set(
      (data as WeaponItem[]).map(
        (item) => item.properties?.baseItem?.properties?.caliber
      )
    )
  ).sort();

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Weapons
      </h1>
      <DataTableClient
        data={data}
        columns={columnsWeapon}
        filters={[
          {
            id: "category",
            label: "Category",
            filterType: "select",
            options: categories,
            formatter: UniversalFormat,
          },
          {
            id: "caliber",
            label: "Caliber",
            filterType: "select",
            options: caliberList,
            formatter: CaliberFormat,
          },
          {
            id: "fireRate",
            label: "Fire Rate",
            filterType: "slider",
            min: 10,
            max: 1200,
            step: 10,
            formatter: UniversalFormat,
          },
          {
            id: "recoilVertical",
            label: "Recoil Vertical",
            filterType: "slider",
            min: 30,
            max: 536,
            step: 10,
            formatter: UniversalFormat,
          },
          {
            id: "recoilHorizontal",
            label: "Fire Rate",
            filterType: "slider",
            min: 133,
            max: 851,
            step: 10,
            formatter: UniversalFormat,
          },
          {
            id: "ergonomics",
            label: "Ergonomics",
            filterType: "slider",
            min: -9,
            max: 100,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "effectiveDistance",
            label: "Distance",
            filterType: "slider",
            min: 50,
            max: 1000,
            step: 10,
            formatter: UniversalFormat,
          },
        ]}
      />
    </div>
  );
};

export default WeaponsPageClient;
