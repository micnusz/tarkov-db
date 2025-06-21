"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import MuzzleDevicesClientPage from "./MuzzleDevicesClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Muzzle Devices - Tarkov.db",
    description: "Tarkov.db, Muzzle Devices",
  };
};
const MuzzleDevicesServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["muzzle-devices"],
    queryFn: () => client.getMuzzleDevices(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MuzzleDevicesClientPage />
    </HydrationBoundary>
  );
};

export default MuzzleDevicesServerPage;
