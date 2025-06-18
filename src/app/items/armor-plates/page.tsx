"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import ArmorPlatesPageClient from "./ArmorPlatesPageClient";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Armor Plates - Tarkov.db",
    description: "Tarkov.db, Armor Plates",
  };
};
const ArmorPlatesPageServer = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["armor-plates"],
    queryFn: () => client.getArmorPlates(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArmorPlatesPageClient />
    </HydrationBoundary>
  );
};

export default ArmorPlatesPageServer;
