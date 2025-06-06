"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api/client";

import { columnsAmmo } from "@/components/columns";
import { DataTableAmmo } from "@/components/ui/data-table-ammo";

const AmmoPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["ammo"],
    queryFn: () => client.getAmmo(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-2 md:p-10">
      <DataTableAmmo data={data} columns={columnsAmmo} />
    </div>
  );
};

export default AmmoPageClient;
