import { BaseItem, Task } from "@/app/api/types";
import { columnsTaskSimple } from "@/components/data-table/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import React from "react";

type RequiredForProps = {
  data: Task[];
};

const RequiredFor = ({ data }: RequiredForProps) => {
  return <SimpleDataTable data={data} columns={columnsTaskSimple} />;
};

export default RequiredFor;
