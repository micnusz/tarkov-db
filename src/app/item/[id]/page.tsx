"use server";
import { client } from "@/app/api/client";
import { getQueryClient } from "@/lib/get-query-client";
import ItemPageClient from "./ItemPageClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: { id: string; name: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const items = await client.getItemIdName(id);
  const name = items?.[0]?.name ?? "Default title";
  return {
    title: `${name} - Tarkov.db`,
    description: `Tarkov.db, ${name}`,
  };
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
