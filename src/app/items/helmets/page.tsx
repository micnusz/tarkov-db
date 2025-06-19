"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import HelmetsClientPage from "./HelmetsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Helmets - Tarkov.db",
    description: "Tarkov.db, Helmets",
  };
};
const HeadsetsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["helmets"],
    queryFn: () => client.getHelmets(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HelmetsClientPage />
    </HydrationBoundary>
  );
};

export default HeadsetsServerPage;
