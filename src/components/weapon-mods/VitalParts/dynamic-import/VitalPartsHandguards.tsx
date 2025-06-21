"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const VitalPartsHandguards = () => {
  const { data: itemHandguards } = useSuspenseQuery({
    queryKey: ["vital-parts-handguards"],
    queryFn: () => client.getHandguards(),
  });

  return (
    <div>
      <DataTableClient
        data={itemHandguards}
        columns={columnsItemPropertiesWeaponMod}
        filters={[
          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -30,
            max: 5,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "recoilModifier",
            label: "Recoil Modifier",
            filterType: "slider",
            min: -0.14,
            max: 0,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.03,
            max: 0.89,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 208000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default VitalPartsHandguards;
