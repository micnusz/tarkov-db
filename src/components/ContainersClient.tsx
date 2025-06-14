"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTableContainers } from "./data-table/data-table-containers";
import { columnsContainer } from "./data-table/columns";

const ContainersClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["containers"],
    queryFn: () => client.getBarterItems(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableContainers columns={columnsContainer} data={data} />
    </div>
  );
};

export default ContainersClient;
