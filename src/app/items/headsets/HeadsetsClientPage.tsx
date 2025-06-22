"use client";

import { client } from "@/app/api/client";
import { GrenadeItem, HeadsetItem } from "@/app/api/types";
import {
  columnsGrenades,
  columnsHeadsets,
} from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalPercentFormat from "@/components/modules/universal-percent-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const HeadsetsClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["headsets"],
    queryFn: () => client.getHeadsets(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Headsets
      </h1>
      <DataTableClient
        columns={columnsHeadsets}
        data={data}
        filters={[
          {
            id: "distanceModifier",
            label: "Distance Modifier",
            filterType: "slider",
            min: 0,
            max: 1.14,
            step: 0.01,
            formatter: (val) => `${val}%`,
          },
          {
            id: "distortion",
            label: "Distortion",
            filterType: "slider",
            min: 0,
            max: 0.15,
            step: 0.01,
            formatter: UniversalPercentFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.3,
            max: 0.7,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
        ]}
      />
    </div>
  );
};

export default HeadsetsClientPage;
