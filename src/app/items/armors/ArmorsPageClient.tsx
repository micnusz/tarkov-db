"use client";
import { client } from "@/app/api/client";
import { columnsArmors } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import { useSuspenseQuery } from "@tanstack/react-query";

const ArmorsPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["armors"],
    queryFn: () => client.getArmors(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <DataTableClient columns={columnsArmors} data={data} />
    </div>
  );
};

export default ArmorsPageClient;
