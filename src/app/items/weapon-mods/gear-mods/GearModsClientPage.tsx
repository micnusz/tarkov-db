"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { lazy, Suspense, useState } from "react";

const componentsMap = {
  chargingHandles: lazy(
    () =>
      import(
        "@/components/dynamic-import/weapon-mods/GearMods/dynamic-import/GearModsChargingHandles"
      )
  ),
  magazines: lazy(
    () =>
      import(
        "@/components/dynamic-import/weapon-mods/GearMods/dynamic-import/GearModsMagazines"
      )
  ),
  mounts: lazy(
    () =>
      import(
        "@/components/dynamic-import/weapon-mods/GearMods/dynamic-import/GearModsMounts"
      )
  ),
  stocks: lazy(
    () =>
      import(
        "@/components/dynamic-import/weapon-mods/GearMods/dynamic-import/GearModsStocks"
      )
  ),
  underbarrelGrenadeLauncher: lazy(
    () =>
      import(
        "@/components/dynamic-import/weapon-mods/GearMods/dynamic-import/GearModsUBGL"
      )
  ),
};

const GearModsClientPage = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<keyof typeof componentsMap>("chargingHandles");
  const DynamicComponent = componentsMap[selectedComponent];

  const formattedTitle =
    selectedComponent.charAt(0).toUpperCase() +
    selectedComponent.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Gear Mods: {formattedTitle}
      </h1>
      {/* Table stwitch */}
      <div className="pt-4 flex gap-2 flex-wrap justify-center">
        {Object.keys(componentsMap).map((key) => (
          <Button
            key={key}
            onClick={() =>
              setSelectedComponent(key as keyof typeof componentsMap)
            }
            variant={selectedComponent === key ? "default" : "outline"}
          >
            {key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")}
          </Button>
        ))}
      </div>
      {/* DynamicComponent, lazyload + suspense */}
      <div>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              filterCount={1}
              searchCount={1}
              cellWidths={["6rem", "20rem", "6rem", "6rem", "6rem"]}
              shrinkZero
              className="p-0 md:p-0 m-0 md:m-0"
            />
          }
        >
          <DynamicComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default GearModsClientPage;
