"use server";
import { client } from "@/app/api/client";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TaskPageClient from "./TaskPageClient";

type Props = {
  params: { id: string; name: string };
};

const TaskPageServer = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["task", id],
    queryFn: () => client.getTask(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskPageClient id={id} />
    </HydrationBoundary>
  );
};

export default TaskPageServer;
