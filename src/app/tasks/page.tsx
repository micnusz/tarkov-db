"use server";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "../api/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TasksClient from "@/components/TasksClient";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Tasks - Tarkov.db",
    description: "Tarkov.db, Tasks",
  };
};

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
