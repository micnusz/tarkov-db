"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FunctionalModsParts = () => {
  const { data: itemParts } = useSuspenseQuery({
    queryKey: ["functional-mods-auxiliaries"],
    queryFn: () => client.getAuxiliaries(),
  });
  return (
    <div>
      <DataTableClient
        data={itemParts}
        columns={columnsItemPropertiesWeaponMod}
        filters={[
          {
            id: "ergoPenalty",
            label: "Ergo. Modifier",
            filterType: "slider",
            min: 0,
            max: 6,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "recoilModifier",
            label: "Recoil Modifier",
            filterType: "slider",
            min: 0.01,
            max: 0,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.005,
            max: 0.2,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 61000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default FunctionalModsParts;
