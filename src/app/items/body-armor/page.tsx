"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import ArmorsPageClient from "./ArmorsPageClient";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Body Armors - Tarkov.db",
    description: "Tarkov.db, Body Armors",
  };
};
const ArmorsPageServer = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["body-armors-armored-vests"],
    queryFn: () => client.getArmoredVests(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArmorsPageClient />
    </HydrationBoundary>
  );
};

export default ArmorsPageServer;
