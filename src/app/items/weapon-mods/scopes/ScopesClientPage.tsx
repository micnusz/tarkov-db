"use client";

import { client } from "@/app/api/client";
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
            id: "ergoPenalty",
            label: "Ergo. Penalty",
            filterType: "slider",
            min: -10,
            max: -2,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "sightingRange",
            label: "Sighting Range",
            filterType: "slider",
            min: 500,
            max: 2000,
            step: 100,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.3,
            max: 1.2,
            step: 0.01,
            formatter: (val) => `${val}kg`,
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
