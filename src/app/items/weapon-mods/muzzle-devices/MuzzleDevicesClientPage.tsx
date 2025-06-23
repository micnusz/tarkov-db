"use client";

import { client } from "@/app/api/client";
import { ItemPropertiesWeaponMod } from "@/app/api/types";
import { columnsItemPropertiesWeaponMod } from "@/components/data-table/columns";
import { DataTableClient } from "@/components/data-table/data-table-client";
import UniversalCurrencyFormat from "@/components/modules/universal-currency-format";
import UniversalFormat from "@/components/modules/universal-format";
import { useSuspenseQuery } from "@tanstack/react-query";

const MuzzleDevicesClientPage = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["muzzle-devices"],
    queryFn: () => client.getMuzzleDevices(),
  });

  const categories = Array.from(
    new Set(
      (data as ItemPropertiesWeaponMod[])
        .map((key) => key.category?.name)
        .filter((val): val is string => val !== undefined)
    )
  ).sort();
  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Muzzle Devices
      </h1>
      <DataTableClient
        columns={columnsItemPropertiesWeaponMod}
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
            id: "ergoPenalty",
            label: "Ergo. Modifier",
            filterType: "slider",
            min: -30,
            max: 3,
            step: 1,
            formatter: UniversalFormat,
          },
          {
            id: "recoilModifier",
            label: "Recoil Modifier",
            filterType: "slider",
            min: -0.14,
            max: 0,
            step: 0.01,
            formatter: UniversalFormat,
          },
          {
            id: "weight",
            label: "Weight",
            filterType: "slider",
            min: 0.01,
            max: 1.1,
            step: 0.01,
            formatter: (val) => `${val}kg`,
          },
          {
            id: "avg24hPrice",
            label: "Avg Flea Price",
            filterType: "slider",
            min: 13000,
            max: 96000,
            step: 1000,
            formatter: UniversalCurrencyFormat,
          },
        ]}
      />
    </div>
  );
};

export default MuzzleDevicesClientPage;
