"use client";
import { client } from "@/app/api/client";
import { columnsWeapon } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";

const WeaponsPageClient = () => {
  const {
    data = [],
    error,
    isPending,
  } = useQuery({
    queryKey: ["weapons"],
    queryFn: () => client.getWeapons(),
  });
  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error: ${error.message}</span>;

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTable data={data} columns={columnsWeapon} />
    </div>
  );
};

export default WeaponsPageClient;
