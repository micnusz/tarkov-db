"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AmmoPageClient from "./AmmoPageClient";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "../api/client";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Ammo - Tarkov.db",
    description: "Tarkov.db, Ammo",
  };
};
export default async function ammoPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["ammo"],
    queryFn: () => client.getAmmo(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AmmoPageClient />
    </HydrationBoundary>
  );
}
