"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FunctionalModsForegrips = () => {
  const { data: itemForegrips } = useSuspenseQuery({
    queryKey: ["functional-mods-foregrips"],
    queryFn: () => client.getForegrips(),
  });

  return (
    <div>
      <DataTableClient
        data={itemForegrips}
        columns={columnsItemPropertiesWeaponMod}
        filters={[
          {
            id: "ergoPenalty",
            label: "Ergo. Modifier",
            filterType: "slider",
            min: -8,
            max: 10,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "recoilModifier",
            label: "Recoil Modifier",
            filterType: "slider",
            min: -0.04,
            max: 0,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.02,
            max: 0.2,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 66000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default FunctionalModsForegrips;
