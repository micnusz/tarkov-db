import { Barter } from "@/app/api/types";
import { columnsBarter } from "@/components/data-table/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import React from "react";

type DataTableBartersProps = {
  data: Barter[];
};

const DataTableBarters = ({ data }: DataTableBartersProps) => {
  return <SimpleDataTable data={data} columns={columnsBarter} />;
};

export default DataTableBarters;
