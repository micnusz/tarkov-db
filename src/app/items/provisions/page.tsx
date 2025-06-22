"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import ProvisionsClientPage from "./ProvisionsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Provisions - Tarkov.db",
    description: "Tarkov.db, Provisions",
  };
};
const ProvisionsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["provisions-food"],
    queryFn: () => client.getFood(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProvisionsClientPage />
    </HydrationBoundary>
  );
};

export default ProvisionsServerPage;
