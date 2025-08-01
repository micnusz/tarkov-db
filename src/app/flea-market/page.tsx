"use server";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { client } from "../api/client";
import FleaMarketClient from "./FleaMarketClient";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Flea Market - Tarkov.db",
    description: "Tarkov.db, Flea Market",
  };
};
export default async function Home() {
  const queryClient = getQueryClient();

  const offset = 0;
  const limit = 20;
  const name = "";

  await queryClient.prefetchQuery({
    queryKey: ["items", offset, limit, name],
    queryFn: () => client.getItems(limit, offset, name),
  });
  await queryClient.prefetchQuery({
    queryKey: ["items-categories"],
    queryFn: () => client.getItemCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FleaMarketClient />
    </HydrationBoundary>
  );
}
