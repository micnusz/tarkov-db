"use client";
import { client } from "@/app/api/client";
import { columnsBackpacks } from "@/components/data-table/columns";
import { DataTableBackpacks } from "@/components/data-table/data-table-backpacks";
import { useSuspenseQuery } from "@tanstack/react-query";

const BackpacksPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["backpacks"],
    queryFn: () => client.getBackpacks(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableBackpacks columns={columnsBackpacks} data={data} />
    </div>
  );
};

export default BackpacksPageClient;
