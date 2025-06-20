"use client";

import { client } from "@/app/api/client";
import { columnsBarrels } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const VitalPartsBrrels = () => {
  const { data: itemBarrels } = useSuspenseQuery({
    queryKey: ["vital-parts-barrels"],
    queryFn: () => client.getBarrels(),
  });

  return (
    <div>
      <DataTableClient
        data={itemBarrels}
        columns={columnsBarrels}
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
        ]}
      />
    </div>
  );
};

export default VitalPartsBrrels;
