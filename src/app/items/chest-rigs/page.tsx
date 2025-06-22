"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import ChestRigsClientPage from "./ChestRigsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Chest Rigs - Tarkov.db",
    description: "Tarkov.db, Chest Rigs",
  };
};
const ChestRigsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["chest-rigs"],
    queryFn: () => client.getChestRigs(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChestRigsClientPage />
    </HydrationBoundary>
  );
};

export default ChestRigsServerPage;
