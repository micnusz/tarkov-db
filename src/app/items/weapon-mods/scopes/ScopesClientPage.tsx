"use client";

import { client } from "@/app/api/client";
import { ScopeItem } from "@/app/api/types";
import { columnsScopes } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const ScopesClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["scopes"],
    queryFn: () => client.getScopes(),
  });

  const categories = Array.from(
    new Set(
      (data as ScopeItem[])
        .map((key) => key.category?.name)
        .filter((val): val is string => val !== undefined)
    )
  ).sort();
  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Scopes
      </h1>
      <DataTableClient
        columns={columnsScopes}
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
            min: 13000,
            max: 120000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default ScopesClientPage;
