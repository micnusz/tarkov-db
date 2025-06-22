"use client";

import { client } from "@/app/api/client";
import { ItemPropertiesMedicalItem } from "@/app/api/types";
import { columnsMedicalItems } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import { safeCamelCaseToTitle } from "@/components/modules/camel-case-to-title-format";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalPercentFormat from "@/components/modules/universal-percent-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const MedicalMedicalItems = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["medical-medical-items"],
    queryFn: () => client.getMedicalItems(),
  });

  const cures = Array.from(
    new Set(
      (data as ItemPropertiesMedicalItem[]).flatMap(
        (item) => item.properties?.cures ?? []
      )
    )
  ).sort();

  return (
    <div>
      <DataTableClient
        columns={columnsMedicalItems}
        data={data}
        filters={[
          {
            id: "uses",
            label: "Uses",
            filterType: "slider",
            min: 1,
            max: 15,
            step: 1,
            formatter: UniversalPercentFormat,
          },
          {
            id: "useTime",
            label: "Use Time",
            filterType: "slider",
            min: 2,
            max: 20,
            step: 0.01,
            formatter: UniversalPercentFormat,
          },
          {
            id: "cures",
            label: "Cures",
            filterType: "select",
            options: cures,
            formatter: safeCamelCaseToTitle,
          },
        ]}
      />
    </div>
  );
};

export default MedicalMedicalItems;
