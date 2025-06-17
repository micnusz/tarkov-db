"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTableTasks } from "./data-table/data-table-tasks";
import { columnsTaskAdvanced } from "./data-table/columns";
import { Task } from "@/app/api/types";
import { DataTableClient } from "./data-table/data-table-client";

const TasksClient = () => {
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
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableClient
        data={data}
        columns={columnsTaskAdvanced}
        filters={[
          {
            id: "trader",
            label: "Trader",
            options: trader,
          },
          {
            id: "map.name",
            label: "Map",
            options: maps,
          },
        ]}
      />
    </div>
  );
};

export default TasksClient;
