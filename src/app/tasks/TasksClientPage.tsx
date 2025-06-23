"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Task } from "@/app/api/types";
import { DataTableClient } from "@/components/data-table/data-table-client";
import { columnsTaskAdvanced } from "@/components/data-table/columns";
import UniversalFormat from "@/components/modules/universal-format";

const TasksClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => client.getTasks(),
  });

  const trader = Array.from(
    new Set((data as Task[]).map((task) => task.trader.name))
  ).sort();

  const maps = Array.from(
    new Set(
      data
        .map((item) => item.map?.name)
        .filter((name): name is string => Boolean(name))
    )
  ).sort();

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Tasks
      </h1>
      <DataTableClient
        data={data}
        columns={columnsTaskAdvanced}
        filters={[
          {
            id: "trader",
            label: "Trader",
            filterType: "select",
            options: trader,
          },
          {
            id: "minPlayerLevel",
            label: "Min. Player Level",
            filterType: "slider",
            min: 0,
            max: 65,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "map.name",
            label: "Map",
            filterType: "select",
            options: maps,
          },
          {
            id: "requirements",
            label: "Required For",
            filterType: "select",
            options: ["Both", "Kappa", "Lightkeeper", "None"],
          },
        ]}
      />
    </div>
  );
};

export default TasksClientPage;
