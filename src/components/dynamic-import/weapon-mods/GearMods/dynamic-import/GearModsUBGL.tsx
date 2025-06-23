"use client";

import { client } from "@/app/api/client";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const GearModsUBGL = () => {
  const { data: itemUBGL } = useSuspenseQuery({
    queryKey: ["gear-mods-ubgl"],
    queryFn: () => client.getUBGL(),
  });

  return (
    <div>
      <DataTableClient
        data={itemUBGL}
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
            min: 1.35,
            max: 1.5,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
        ]}
      />
    </div>
  );
};

export default GearModsUBGL;
