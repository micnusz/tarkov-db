"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { DataTable } from "@/components/ui/data-table";
import { columnsAmmo } from "@/components/columns";

const AmmoPageClient = () => {
  const { data = [] } = useQuery({
    queryKey: ["ammo"],
    queryFn: () => client.getAmmo(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTable data={data} columns={columnsAmmo} />
    </div>
  );
};

export default AmmoPageClient;
