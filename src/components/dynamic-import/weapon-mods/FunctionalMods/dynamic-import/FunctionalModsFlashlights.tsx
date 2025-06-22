"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const FunctionalModsFlashlights = () => {
  const { data: itemFlashlight } = useSuspenseQuery({
    queryKey: ["functional-mods-flashlights"],
    queryFn: () => client.getFlashlights(),
  });

  return (
    <div>
      <DataTableClient
        data={itemFlashlight}
        columns={columnsItemPropertiesWeaponMod}
        filters={[
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.1,
            max: 0.26,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 7000,
            max: 15000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default FunctionalModsFlashlights;
