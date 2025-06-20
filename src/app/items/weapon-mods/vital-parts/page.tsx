"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import VitalPartsClientPage from "./VitalPartsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Vital Parts - Tarkov.db",
    description: "Tarkov.db, Vital Parts",
  };
};
const VitalPartsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vital-parts-barrels"],
    queryFn: () => client.getBarrels(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VitalPartsClientPage />
    </HydrationBoundary>
  );
};

export default VitalPartsServerPage;
