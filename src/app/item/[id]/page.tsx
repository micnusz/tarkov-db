"use server";
import { client } from "@/app/api/client";
import { getQueryClient } from "@/lib/get-query-client";
import ItemPageClient from "./ItemPageClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const item = await client.getItemIdTitle(id);
  const name = item?.name ?? "Default title";

  return {
    title: `${name} - Tarkov.db`,
    description: `Item Page: ${name} - Tarkov.db`,
  };
};

const ItemPageServer = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItemBaseId(id),
  });
  const item = queryClient.getQueryData(["item", id]);
  if (!item) {
    notFound(); // tutaj Next wyrenderuje 404
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemPageClient id={id} />
    </HydrationBoundary>
  );
};

export default ItemPageServer;
