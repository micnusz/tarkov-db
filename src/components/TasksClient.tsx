"use client";

import { client } from "@/app/api/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { columnsTasks } from "./columns";
import { DataTableTasks } from "./ui/data-table-tasks";

const TasksClient = () => {
  const { data = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => client.getTasks(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <DataTableTasks data={data} columns={columnsTasks} />
    </div>
  );
};

export default TasksClient;
