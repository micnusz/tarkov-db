"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Barter } from "@/app/api/types";
import { useMemo } from "react";
import Link from "next/link";
import DefaultHeader from "./ui/default-header";
import { DataTableBarters } from "./data-table/data-table-barters";
import { Badge } from "./ui/badge";
import { columnsBarter } from "./data-table/columns";

const BartersClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["barters"],
    queryFn: () => client.getBarters(),
  });

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableBarters data={data} columns={columnsBarter} />
    </div>
  );
};

export default BartersClient;
