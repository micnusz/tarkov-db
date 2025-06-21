"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FunctionalModsTacticalDevices = () => {
  const { data: itemTactical } = useSuspenseQuery({
    queryKey: ["functional-mods-tactical-devices"],
    queryFn: () => client.getTacticalDevices(),
  });

  return (
    <div>
      <DataTableClient
        data={itemTactical}
        columns={columnsItemPropertiesWeaponMod}
        filters={[
          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -2,
            max: -1,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.05,
            max: 0.4,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 34000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default FunctionalModsTacticalDevices;
