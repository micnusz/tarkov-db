"use client";

import { client } from "@/app/api/client";
import { columnsProvisions } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import { safeCamelCaseToTitle } from "@/components/modules/camel-case-to-title-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const ProvisionsDrink = () => {
  const { data: itemDrink } = useSuspenseQuery({
    queryKey: ["provisions-drinks"],
    queryFn: () => client.getDrink(),
  });

  return (
    <div>
      <DataTableClient
        columns={columnsProvisions}
        data={itemDrink}
        filters={[
          {
            id: "energy",
            label: "Energy",
            filterType: "slider",
            min: 0,
            max: 25,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "hydration",
            label: "Hydration",
            filterType: "slider",
            min: -50,
            max: 100,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "units",
            label: "Units",
            filterType: "slider",
            min: 1,
            max: 60,
            step: 1,
            formatter: UniversalFormat,
          },
        ]}
      />
    </div>
  );
};

export default ProvisionsDrink;
