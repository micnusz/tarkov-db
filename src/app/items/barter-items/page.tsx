import { client } from "@/app/api/client";
import BarterItemsClientPage from "@/app/items/barter-items/BarterItemsClientPage";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

export const generateMetadata = () => {
  return {
    title: "Barter Items - Tarkov.db",
    description: "Tarkov.db, Barter Items",
  };
};
const BarterItemsServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["barter-items"],
    queryFn: () => client.getBarterItems(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BarterItemsClientPage />
    </HydrationBoundary>
  );
};

export default BarterItemsServerPage;
