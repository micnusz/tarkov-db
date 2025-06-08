"use server";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "./api/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FleaMarketClient from "@/components/FleaMarketClient";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Flea Market - Tarkov.db",
    description: "Tarkov.db, Flea Market",
  };
};
export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["items"],
    queryFn: () => client.getItems(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FleaMarketClient />
    </HydrationBoundary>
  );
}
