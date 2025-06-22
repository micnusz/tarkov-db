"use client";
import { client } from "@/app/api/client";
import { columnsTaskSimple } from "@/components/data-table/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type RequiredForProps = {
  itemId: string;
};

const RequiredFor = ({ itemId }: RequiredForProps) => {
  const { data: itemTask } = useSuspenseQuery({
    queryKey: ["item-task-required", itemId],
    queryFn: () => client.getItemIdTask(itemId),
  });
  const tasks = itemTask.usedInTasks ?? [];

  return <SimpleDataTable data={tasks} columns={columnsTaskSimple} />;
};

export default RequiredFor;
