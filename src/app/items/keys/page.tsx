"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import KeysClientPage from "./KeysClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Keys - Tarkov.db",
    description: "Tarkov.db, Keys",
  };
};
const KeysServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["keys"],
    queryFn: () => client.getKeys(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <KeysClientPage />
    </HydrationBoundary>
  );
};

export default KeysServerPage;
