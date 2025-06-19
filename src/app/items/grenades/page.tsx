"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import GrenadesClientPage from "./GrenadesClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Grenades - Tarkov.db",
    description: "Tarkov.db, Grenades",
  };
};
const GrenadesServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["grenades"],
    queryFn: () => client.getGrenades(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GrenadesClientPage />
    </HydrationBoundary>
  );
};

export default GrenadesServerPage;
