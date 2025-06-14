"use server";
import { client } from "@/app/api/client";
import { getQueryClient } from "@/lib/get-query-client";
import ItemPageClient from "./ItemPageClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const item = await client.getItemIdTitle(id);
  const name = item?.name ?? "Default title";
  return {
    title: `${name} - Tarkov.db`,
    description: `Item Page: ${name} - Tarkov.db`,
  };
};

const ItemPageServer = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItemBaseId(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemPageClient id={id} />
    </HydrationBoundary>
  );
};

export default ItemPageServer;
