"use client";

import { client } from "@/app/api/client";
import { KeyItem } from "@/app/api/types";
import { columnsKeys } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import Spinner from "@/lib/Spinner";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

const VitalPartsClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["vital-parts"],
    queryFn: () => client.getKeys(),
  });

  const categories = Array.from(
    new Set(
      (data as KeyItem[])
        .map((key) => key.category?.name)
        .filter((val): val is string => val !== undefined)
    )
  ).sort();

  const VitalPartsBrrels = lazy(
    () => import("@/components/weapon-mods/dynamic-import/VitalPartsBarrels")
  );

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Vital Parts
      </h1>
      {/* Barels, lazyload + suspense */}
      <div>
        <Suspense fallback={<Spinner />}>
          <VitalPartsBrrels />
        </Suspense>
      </div>
    </div>
  );
};

export default VitalPartsClientPage;
