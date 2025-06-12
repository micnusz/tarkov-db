"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTableTasks } from "./data-table/data-table-tasks";
import { columnsTaskAdvanced } from "./data-table/columns";

const TasksClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => client.getTasks(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableTasks data={data} columns={columnsTaskAdvanced} />
    </div>
  );
};

export default TasksClient;
