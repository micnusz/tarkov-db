"use client";
import { client } from "@/app/api/client";
import { columnsBackpacks } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const BackpacksPageClient = () => {
  const { data = [] } = useQuery({
    queryKey: ["backpacks"],
    queryFn: () => client.getBackpacks(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTable columns={columnsBackpacks} data={data} />
    </div>
  );
};

export default BackpacksPageClient;
