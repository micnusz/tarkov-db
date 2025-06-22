"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { columnsAmmo } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import CaliberFormat from "@/components/modules/ammo-format";
import { Ammo } from "../api/types";
import UniversalFormat from "@/components/modules/universal-format";
import UniversalPercentFormat from "@/components/modules/universal-percent-format";

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
              filterType: "slider",
              min: 0,
              max: 97,
              step: 1,
              formatter: UniversalFormat,
            },
            {
              id: "damage",
              label: "Damage",
              filterType: "slider",
              min: 0,
              max: 265,
              step: 1,
              formatter: UniversalFormat,
            },
            {
              id: "armorDamage",
              label: "Armor Damage",
              filterType: "slider",
              min: 0,
              max: 95,
              step: 1,
              formatter: UniversalFormat,
            },
            {
              id: "accuracyModifier",
              label: "Accuracy Modifier",
              filterType: "slider",
              min: -0.22,
              max: 1.7,
              step: 0.1,
              formatter: UniversalPercentFormat,
            },
            {
              id: "recoilModifier",
              label: "Recoil Modifier",
              filterType: "slider",
              min: -0.3,
              max: 1.15,
              step: 0.1,
              formatter: UniversalPercentFormat,
            },
            {
              id: "fragmentationChance",
              label: "Frag. Chance",
              filterType: "slider",
              min: 0,
              max: 100,
              step: 10,
              formatter: (val) => `${val}%`,
            },
            {
              id: "initialSpeed",
              label: "Initial Speed",
              filterType: "slider",
              min: 20,
              max: 1013,
              step: 10,
              formatter: (val) => `${val}m/s`,
            },
            {
              id: "ricochetChance",
              label: "Ricochet Chance",
              filterType: "slider",
              min: 0,
              max: 100,
              step: 10,
              formatter: (val) => `${val}%`,
            },
          ]}
        />
      </div>
    </main>
  );
};

export default AmmoPageClient;
