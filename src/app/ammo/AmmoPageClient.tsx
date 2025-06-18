"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { columnsAmmo } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import CaliberFormat from "@/components/modules/ammo-format";
import { Ammo } from "../api/types";
import { RangeFilterFormat } from "@/components/modules/range-filter-format";
import UniversalFormat from "@/components/modules/universal-format";

const AmmoPageClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["ammo"],
    queryFn: () => client.getAmmo(),
  });

  const ammo = Array.from(
    new Set((data as Ammo[]).map((ammo) => ammo.caliber))
  ).sort();

  return (
    <main>
      <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Ammunition
        </h1>
        <DataTableClient
          data={data}
          columns={columnsAmmo}
          filters={[
            {
              id: "caliber",
              label: "Caliber",
              filterType: "select",
              options: ammo,
              formatter: CaliberFormat,
            },
            {
              id: "penetrationPower",
              label: "Pen. Power",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "damage",
              label: "Damage",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "armorDamage",
              label: "Armor Damage",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "accuracyModifier",
              label: "Accuracy Modifier",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "recoilModifier",
              label: "Recoil Modifier",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "fragmentationChance",
              label: "Frag. Chance",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "initialSpeed",
              label: "Initial Speed",
              filterType: "range",
              formatter: UniversalFormat,
            },
            {
              id: "ricochetChance",
              label: "Ricochet Chance",
              filterType: "range",
              formatter: UniversalFormat,
            },
          ]}
        />
      </div>
    </main>
  );
};

export default AmmoPageClient;
