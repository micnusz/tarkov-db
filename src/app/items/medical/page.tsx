"use server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { client } from "@/app/api/client";
import { Metadata } from "next";
import MedicalClientPage from "./MedicalClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Medical - Tarkov.db",
    description: "Tarkov.db, Medical",
  };
};
const MedicalServerPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["medical-medical-items"],
    queryFn: () => client.getMedicalItems(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MedicalClientPage />
    </HydrationBoundary>
  );
};

export default MedicalServerPage;
