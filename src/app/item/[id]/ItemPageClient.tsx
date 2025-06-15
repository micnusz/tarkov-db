"use client";

import { client } from "@/app/api/client";
import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loading from "./loading";
import Image from "next/image";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import Spinner from "@/lib/Spinner";

type ItemPageClientProps = {
  id: string;
};

const ItemPageClient = ({ id }: ItemPageClientProps) => {
  const { data: itemData } = useQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItemBaseId(id),
    enabled: !!id,
  });
  if (!itemData) {
    return <Loading />;
  }

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
  const Variants = lazy(
    () => import("@/components/item-rewards/dynamic-import/Variants")
  );

  return (
    <div key={itemData.id} className="flex flex-col p-4 md:p-10">
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Item Title */}
          <h1 className="text-left text-4xl font-extrabold tracking-tight">
            {itemData.name}
          </h1>
          {/* Item Description */}
          {itemData.description && itemData.description.length > 0 ? (
            <p className="leading-7 mt-2">{itemData.description}</p>
          ) : null}
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
          <div>
            <Suspense fallback={<Spinner />}>
              <Variants itemId={itemData.id} />
            </Suspense>
          </div>
        </div>
        {/* Item Image */}
        <div className="flex justify-center items-center md:w-1/2 mx-auto">
          <div className="relative w-[15.625rem] h-[15.625rem]">
            <Image
              src={itemData.image512pxLink}
              alt={itemData.name}
              fill
              priority
              className="object-contain"
              style={{ objectPosition: "center" }}
            />
          </div>
        </div>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">
            Obtained From:
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Task rewards, lazy-laod and suspense */}
            <Suspense fallback={<Spinner />}>
              <TaskRewards itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Required For:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Required For, lazy-laod and suspense */}
            <Suspense fallback={<Spinner />}>
              <RequiredFor itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">Buy Price:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Trader Buy, lazy-laod and suspense */}
            <Suspense fallback={<Spinner />}>
              <DataTableBuy itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg">Sell Price:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Trader Sell, lazy-laod and suspense */}
            <Suspense fallback={<Spinner />}>
              <DataTableSell itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg">Barters:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Barters, lazy-laod and suspense */}
            <Suspense fallback={<Spinner />}>
              <DataTableBarters itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg">Crafted With:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Craftings, lazy-laod and suspense */}
            <Suspense fallback={<Spinner />}>
              <DataTableCraftings itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItemPageClient;
