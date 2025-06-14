"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { DataTableAmmo } from "@/components/data-table/data-table-ammo";
import { columnsAmmo } from "@/components/data-table/columns";

const AmmoPageClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["ammo"],
    queryFn: () => client.getAmmo(),
  });

  return (
    <main>
      <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
        <DataTableAmmo data={data} columns={columnsAmmo} />
      </div>
    </main>
  );
};

export default AmmoPageClient;
