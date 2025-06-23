"use server";
import { client } from "@/app/api/client";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TaskPageClient from "./TaskPageClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const task = await client.getTaskIdTitle(id);
  const name = task?.name ?? "Default title";
  return {
    title: `${name} - Tarkov.db`,
    description: `Tarkov.db, ${name}`,
  };
};

const TaskPageServer = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["task", id],
    queryFn: () => client.getTaskIdBase(id),
  });
  const task = queryClient.getQueryData(["task", id]);
  if (!task) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskPageClient id={id} />
    </HydrationBoundary>
  );
};

export default TaskPageServer;
