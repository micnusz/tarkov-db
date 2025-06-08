"use server";
import { getQueryClient } from "@/lib/get-query-client";
import WeaponsPageClient from "./WeaponsPageClient";
import { client } from "@/app/api/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default async function WeaponsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["weapons"],
    queryFn: () => client.getWeapons(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={9}
            filterCount={11}
            cellWidths={[
              "5rem",
              "20rem",
              "6rem",
              "6rem",
              "6rem",
              "6rem",
              "6rem",
              "6rem",
              "6rem",
            ]}
            shrinkZero
          />
        }
      >
        <WeaponsPageClient />
      </React.Suspense>
    </HydrationBoundary>
  );
}
