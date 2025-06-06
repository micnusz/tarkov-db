"use server";
import { client } from "@/app/api/client";
import { getQueryClient } from "@/lib/get-query-client";
import ItemPageClient from "./ItemPageClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: { id: string };
};

const ItemPageServer = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItem(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemPageClient id={id} />
    </HydrationBoundary>
  );
};

export default ItemPageServer;
