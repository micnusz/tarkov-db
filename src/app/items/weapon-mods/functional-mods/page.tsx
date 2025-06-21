"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import FunctionalModsClientPage from "./FunctionalModsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Functional Mods - Tarkov.db",
    description: "Tarkov.db, Functional Mods",
  };
};
const FunctionalModsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["functional-mods-bipods"],
    queryFn: () => client.getBipods(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FunctionalModsClientPage />
    </HydrationBoundary>
  );
};

export default FunctionalModsServerPage;
