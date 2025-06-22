"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FunctionalModsBipods = () => {
  const { data: itemBipods } = useSuspenseQuery({
    queryKey: ["functional-mods-bipods"],
    queryFn: () => client.getBipods(),
  });

  return (
    <div>
      <DataTableClient
        data={itemBipods}
        columns={columnsItemPropertiesWeaponMod}
        filters={[
          {
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -8,
            max: 0,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.02,
            max: 0.6,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 920000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default FunctionalModsBipods;
