"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import FaceCoversClientPage from "./FacewearClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Face Covers - Tarkov.db",
    description: "Tarkov.db, Face Covers",
  };
};
const FaceCoversServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["facewear-face-covers"],
    queryFn: () => client.getFaceCovers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FaceCoversClientPage />
    </HydrationBoundary>
  );
};

export default FaceCoversServerPage;
