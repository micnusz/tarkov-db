"use server";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "../api/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TasksClient from "@/components/TasksClient";

const TasksServer = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => client.getTasks(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksClient />
    </HydrationBoundary>
  );
};

export default TasksServer;
