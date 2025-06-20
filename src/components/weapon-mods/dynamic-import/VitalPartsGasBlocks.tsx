"use client";

import { client } from "@/app/api/client";
import {
  columnsBarrels,
  columnsGasBlock,
} from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const VitalPartsGasBlocks = () => {
  const { data: itemGasBlocks } = useSuspenseQuery({
    queryKey: ["vital-parts-gas-blocks"],
    queryFn: () => client.getGasBlocks(),
  });

  return (
    <div>
      <DataTableClient
        data={itemGasBlocks}
        columns={columnsGasBlock}
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
        ]}
      />
    </div>
  );
};

export default VitalPartsGasBlocks;
