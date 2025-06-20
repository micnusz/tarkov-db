"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import ScopesClientPage from "./ScopesClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Scopes - Tarkov.db",
    description: "Tarkov.db, Scopes",
  };
};
const ScopesServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["scopes"],
    queryFn: () => client.getScopes(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScopesClientPage />
    </HydrationBoundary>
  );
};

export default ScopesServerPage;
