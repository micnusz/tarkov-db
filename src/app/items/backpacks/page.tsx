"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import BackpacksPageClient from "./BackpacksPageClient";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Backpacks - Tarkov.db",
    description: "Tarkov.db, Backpacks",
  };
};
const BackpacksPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["backpacks"],
    queryFn: () => client.getBackpacks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BackpacksPageClient />
    </HydrationBoundary>
  );
};

export default BackpacksPage;
