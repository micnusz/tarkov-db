"use client";

import { client } from "@/app/api/client";
import { columnsProvisions } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const ProvisionsFood = () => {
  const { data: itemFood } = useSuspenseQuery({
    queryKey: ["provisions-food"],
    queryFn: () => client.getFood(),
  });

  return (
    <div>
      <DataTableClient
        columns={columnsProvisions}
        data={itemFood}
        filters={[
          {
            id: "energy",
            label: "Energy",
            filterType: "slider",
            min: 10,
            max: 100,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "hydration",
            label: "Hydration",
            filterType: "slider",
            min: -99,
            max: 5,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "units",
            label: "Units",
            filterType: "slider",
            min: 1,
            max: 100,
            step: 1,
            formatter: UniversalFormat,
          },
        ]}
      />
    </div>
  );
};

export default ProvisionsFood;
