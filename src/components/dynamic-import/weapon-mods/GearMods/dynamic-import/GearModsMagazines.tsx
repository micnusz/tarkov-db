"use client";

import { client } from "@/app/api/client";
import { columnsMagazines } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const GearModsMagazines = () => {
  const { data: itemMagazines } = useSuspenseQuery({
    queryKey: ["gear-mods-magazines"],
    queryFn: () => client.getMagazines(),
  });

  return (
    <div>
      <DataTableClient
        data={itemMagazines}
        columns={columnsMagazines}
        filters={[
          {
            id: "capacity",
            label: "Capacity",
            filterType: "slider",
            min: 0,
            max: 100,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "ergoPenalty",
            label: "Ergo. Modifier",
            filterType: "slider",
            min: -30,
            max: 5,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "loadModifier",
            label: "Loading Modifier",
            filterType: "slider",
            min: -0.3,
            max: 0.9,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "ammoCheckModifier",
            label: "Ammo Check Modifier",
            filterType: "slider",
            min: -0.5,
            max: 0.35,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 175000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default GearModsMagazines;
