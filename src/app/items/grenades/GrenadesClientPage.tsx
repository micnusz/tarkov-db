"use client";

import { client } from "@/app/api/client";
import { GrenadeItem } from "@/app/api/types";
import { columnsGrenades } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const GrenadesClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["grenades"],
    queryFn: () => client.getGrenades(),
  });

  const grenadeType = Array.from(
    new Set(
      (data as GrenadeItem[])
        .map((grenade) => grenade.properties?.type)
        .filter((grenade): grenade is string => grenade !== undefined)
    )
  ).sort();

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Grenades
      </h1>
      <DataTableClient
        columns={columnsGrenades}
        data={data}
        filters={[
          {
            id: "type",
            label: "Type",
            filterType: "select",
            options: grenadeType.map(String),
            formatter: UniversalFormat,
          },
          {
            id: "fuse",
            label: "Fuse time",
            filterType: "slider",
            min: 0,
            max: 5,
            step: 0.1,
            formatter: (val) => `${val} sec`,
          },
          {
            id: "fragments",
            label: "Fragments",
            filterType: "slider",
            min: 0,
            max: 100,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "maxExplosion",
            label: "Max Range",
            filterType: "slider",
            min: 0,
            max: 8,
            step: 1,
            formatter: (val) => `${val}m`,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0,
            max: 0.6,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
        ]}
      />
    </div>
  );
};

export default GrenadesClientPage;
