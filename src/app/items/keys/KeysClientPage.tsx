"use client";

import { client } from "@/app/api/client";
import { KeyItem } from "@/app/api/types";
import { columnsKeys } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const KeysClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["keys"],
    queryFn: () => client.getKeys(),
  });

  const categories = Array.from(
    new Set(
      (data as KeyItem[])
        .map((key) => key.category?.name)
        .filter((val): val is string => val !== undefined)
    )
  ).sort();

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Keys
      </h1>
      <DataTableClient
        columns={columnsKeys}
        data={data}
        filters={[
          {
            id: "category",
            label: "Category",
            filterType: "select",
            formatter: UniversalFormat,
            options: categories,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 0,
            max: 5000000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default KeysClientPage;
