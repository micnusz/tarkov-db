"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import HeadsetsClientPage from "./HeadsetsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Headsets - Tarkov.db",
    description: "Tarkov.db, Headsets",
  };
};
const HeadsetsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["headsets"],
    queryFn: () => client.getHeadsets(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeadsetsClientPage />
    </HydrationBoundary>
  );
};

export default HeadsetsServerPage;
