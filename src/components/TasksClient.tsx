"use client";

import { client } from "@/app/api/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DataTable } from "./ui/data-table";
import { columnsTasks } from "./columns";

const TasksClient = () => {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => client.getAmmo(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTable data={data} columns={columnsTasks} />
    </div>
  );
};

export default TasksClient;
