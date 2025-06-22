"use client";

import { client } from "@/app/api/client";
import { ItemPropertiesMedKit } from "@/app/api/types";
import { columnsMedkits } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import { safeCamelCaseToTitle } from "@/components/modules/camel-case-to-title-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const MedicalMedkits = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["medical-medkits"],
    queryFn: () => client.getMedkits(),
  });

  const cures = Array.from(
    new Set(
      (data as ItemPropertiesMedKit[]).flatMap(
        (item) => item.properties?.cures ?? []
      )
    )
  ).sort();

  return (
    <div>
      <DataTableClient
        columns={columnsMedkits}
        data={data}
        filters={[
          {
            id: "hitpoints",
            label: "HP",
            filterType: "slider",
            min: 100,
            max: 1800,
            step: 10,
            formatter: UniversalFormat,
          },
          {
            id: "useTime",
            label: "Use Time",
            filterType: "slider",
            min: 2,
            max: 5,
            step: 1,
            formatter: (val) => `${val} sec`,
          },
          {
            id: "cures",
            label: "Cures",
            filterType: "select",
            options: cures,
            formatter: safeCamelCaseToTitle,
          },
          {
            id: "maxHealPerUse",
            label: "Max Heal",
            filterType: "slider",
            min: 50,
            max: 175,
            step: 10,
            formatter: UniversalFormat,
          },
          {
            id: "hpCostLightBleeding",
            label: "Light Bleed",
            filterType: "slider",
            min: 0,
            max: 50,
            step: 10,
            formatter: UniversalFormat,
          },
          {
            id: "hpCostHeavyBleeding",
            label: "Heavy Bleed",
            filterType: "slider",
            min: 0,
            max: 210,
            step: 10,
            formatter: UniversalFormat,
          },
        ]}
      />
    </div>
  );
};

export default MedicalMedkits;
