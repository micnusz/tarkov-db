"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import GearModsClientPage from "./GearModsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Gear Mods - Tarkov.db",
    description: "Tarkov.db, Gear Mods",
  };
};
const GearModsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["gear-mods-charging-handles"],
    queryFn: () => client.getChargingHandles(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GearModsClientPage />
    </HydrationBoundary>
  );
};

export default GearModsServerPage;
