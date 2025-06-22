"use server";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import React from "react";
import { client } from "../api/client";
import BartersClientPage from "@/app/barters/BartersClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Barters - Tarkov.db",
    description: "Tarkov.db, Barters",
  };
};
export default async function BartersServer() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["barters"],
    queryFn: () => client.getBarters(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BartersClientPage />
    </HydrationBoundary>
  );
}
