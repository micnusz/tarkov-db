"use client";
import { client } from "@/app/api/client";
import { columnsWeapon } from "@/components/columns";
import { DataTableWeapons } from "@/components/ui/data-table-weapons";
import { useSuspenseQuery } from "@tanstack/react-query";

const WeaponsPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["weapons"],
    queryFn: () => client.getWeapons(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableWeapons data={data} columns={columnsWeapon} />
    </div>
  );
};

export default WeaponsPageClient;
