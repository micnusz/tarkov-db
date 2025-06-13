"use client";

import { client } from "@/app/api/client";
import { Task } from "@/app/api/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React, { lazy, Suspense, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loading from "./loading";
import ItemVariants from "@/components/item-rewards/ItemVariants";
import Image from "next/image";

type ItemPageClientProps = {
  id: string;
};

const ItemPageClient = ({ id }: ItemPageClientProps) => {
  const { data: itemData } = useQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItem(id),
    enabled: !!id,
  });
  if (!itemData) {
    return <Loading />;
  }
  const { data: tradersData } = useSuspenseQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  const hasTaskReward = (tasks: Task[], itemId: string): boolean => {
    return tasks.some((task) =>
      task.finishRewards?.items?.some((reward) => reward.item.id === itemId)
    );
  };

  const TaskRewards = lazy(
    () => import("@/components/item-rewards/dynamic-import/TaskRewards")
  );
  const DataTableBuy = lazy(
    () => import("@/components/item-rewards/dynamic-import/DataTableBuy")
  );
  const DataTableSell = lazy(
    () => import("@/components/item-rewards/dynamic-import/DataTableSell")
  );
  const RequiredFor = lazy(
    () => import("@/components/item-rewards/dynamic-import/RequiredFor")
  );
  const DataTableBarters = lazy(
    () => import("@/components/item-rewards/dynamic-import/DataTableBarters")
  );
  const DataTableCraftings = lazy(
    () => import("@/components/item-rewards/dynamic-import/DataTableCraftings")
  );

  const fallbackDescription =
    itemData.description ?? itemData.properties?.baseItem?.description;

  return (
    <div key={itemData.id} className="flex flex-col p-4 md:p-10">
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Item Title */}
          <h1 className="text-left text-4xl font-extrabold tracking-tight">
            {itemData.name}
          </h1>
          {/* Item Description */}
          {fallbackDescription && (
            <p className="leading-7 mt-2">{fallbackDescription}</p>
          )}
          {/* Item WikiLink */}
          <a
            href={itemData.wikiLink}
            className="text-chart-1 hover:text-muted mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
          {/* Item Variants   */}
          <ItemVariants itemData={itemData} />
        </div>
        {/* Item Image */}
        <div className="flex justify-center items-center md:w-1/2">
          <Image
            src={itemData.image512pxLink}
            alt={itemData.name}
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        {itemData.receivedFromTasks &&
          itemData.receivedFromTasks.length > 0 &&
          (hasTaskReward(itemData.receivedFromTasks, itemData.id) ? (
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                Task rewards:
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {/* Task rewards, lazy-laod and suspense */}
                <Suspense fallback={<div>Loading task rewards...</div>}>
                  <TaskRewards
                    receivedFromTasks={itemData.receivedFromTasks}
                    itemId={itemData.id}
                  />
                </Suspense>
              </AccordionContent>
            </AccordionItem>
          ) : null)}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Buy For:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Trader Buy, lazy-laod and suspense */}
            {tradersData && (
              <Suspense fallback={<div>Loading Traders Data...</div>}>
                <DataTableBuy
                  data={itemData.buyFor}
                  tradersData={tradersData}
                />
              </Suspense>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">Sell For:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Trader Sell, lazy-laod and suspense */}
            {tradersData && (
              <Suspense fallback={<div>Loading Traders Data...</div>}>
                <DataTableSell
                  data={itemData.sellFor}
                  tradersData={tradersData}
                />
              </Suspense>
            )}
          </AccordionContent>
        </AccordionItem>
        {itemData.usedInTasks && itemData.usedInTasks.length > 0 ? (
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">
              Required for:
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {/* Required For, lazy-laod and suspense */}
              <Suspense fallback={<div>Loading Required For Data...</div>}>
                <RequiredFor data={itemData.usedInTasks} />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {itemData.bartersFor?.length > 0 ||
        itemData.bartersUsing?.length > 0 ? (
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">Barters:</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {/* Barters, lazy-laod and suspense */}
              <Suspense fallback={<div>Loading Barters Data...</div>}>
                <DataTableBarters
                  data={[
                    ...(itemData.bartersFor || []),
                    ...(itemData.bartersUsing || []),
                  ]}
                />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {itemData.craftsFor?.length > 0 || itemData.craftsUsing?.length > 0 ? (
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg">Crafting:</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {/* Craftings, lazy-laod and suspense */}
              <Suspense fallback={<div>Loading Crafting Data...</div>}>
                <DataTableCraftings
                  data={[
                    ...(itemData.craftsFor || []),
                    ...(itemData.craftsUsing || []),
                  ]}
                />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </div>
  );
};

export default ItemPageClient;
