"use server";
import { getQueryClient } from "@/lib/get-query-client";
import WeaponsPageClient from "./WeaponsPageClient";
import { client } from "@/app/api/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function WeaponsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["weapons"],
    queryFn: () => client.getWeapons(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeaponsPageClient />
    </HydrationBoundary>
  );
}
