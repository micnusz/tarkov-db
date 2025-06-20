"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { lazy, Suspense, useState } from "react";

const componentsMap = {
  barrels: lazy(
    () => import("@/components/weapon-mods/dynamic-import/VitalPartsBarrels")
  ),
  gasBlocks: lazy(
    () => import("@/components/weapon-mods/dynamic-import/VitalPartsGasBlocks")
  ),
  handguards: lazy(
    () => import("@/components/weapon-mods/dynamic-import/VitalPartsHandguards")
  ),
};

const VitalPartsClientPage = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<keyof typeof componentsMap>("barrels");
  const DynamicComponent = componentsMap[selectedComponent];

  const formattedTitle =
    selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1);

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Vital Parts: {formattedTitle}
      </h1>
      {/* Table stwitch */}
      <div className="flex gap-2 flex-wrap justify-center">
        {Object.keys(componentsMap).map((key) => (
          <button
            key={key}
            onClick={() =>
              setSelectedComponent(key as keyof typeof componentsMap)
            }
            className={`px-4 py-2 rounded ${
              selectedComponent === key
                ? "bg-accent text-white"
                : "bg-primary hover:bg-gray-300"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      {/* DynamicComponent, lazyload + suspense */}
      <div>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              filterCount={0}
              searchCount={0}
              cellWidths={["6rem", "20rem", "6rem", "6rem", "6rem"]}
              shrinkZero
            />
          }
        >
          <DynamicComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default VitalPartsClientPage;
