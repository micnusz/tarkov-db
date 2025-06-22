"use server";

import { client } from "@/app/api/client";
import ContainersClientPage from "@/app/items/containers/ContainersClientPage";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const ContainersServer = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["containers"],
    queryFn: () => client.getContainersItems(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContainersClientPage />
    </HydrationBoundary>
  );
};
export default ContainersServer;
