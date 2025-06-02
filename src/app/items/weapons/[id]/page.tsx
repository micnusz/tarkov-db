import { getQueryClient } from "@/lib/get-query-client";
import { WeaponPageClient } from "./WeaponPageClient";
import { client } from "@/app/api/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

export default async function WeaponPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["weapon", id],
    queryFn: () => client.getWeapon(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeaponPageClient id={id} />
      </HydrationBoundary>
    </>
  );
}
