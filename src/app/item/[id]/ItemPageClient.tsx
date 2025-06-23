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
import Image from "next/image";
import Spinner from "@/lib/Spinner";
import Loading from "./loading";

type ItemPageClientProps = {
  id: string;
};

const ItemPageClient = ({ id }: ItemPageClientProps) => {
  const { data: itemData } = useQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItemBaseId(id),
    enabled: !!id,
  });

  if (itemData === undefined) return <Loading />;
  if (itemData === null) return <div>Item not found.</div>;

  const TaskRewards = lazy(
    () =>
      import(
        "@/components/dynamic-import/item-rewards/dynamic-import/TaskRewards"
      )
  );
  const DataTableBuy = lazy(
    () =>
      import(
        "@/components/dynamic-import/item-rewards/dynamic-import/DataTableBuy"
      )
  );
  const DataTableSell = lazy(
    () =>
      import(
        "@/components/dynamic-import/item-rewards/dynamic-import/DataTableSell"
      )
  );
  const RequiredFor = lazy(
    () =>
      import(
        "@/components/dynamic-import/item-rewards/dynamic-import/RequiredFor"
      )
  );
  const DataTableBarters = lazy(
    () =>
      import(
        "@/components/dynamic-import/item-rewards/dynamic-import/DataTableBarters"
      )
  );
  const DataTableCraftings = lazy(
    () =>
      import(
        "@/components/dynamic-import/item-rewards/dynamic-import/DataTableCraftings"
      )
  );
  const Variants = lazy(
    () =>
      import("@/components/dynamic-import/item-rewards/dynamic-import/Variants")
  );

  return (
    <div
      key={itemData.id}
      className="flex flex-col p-4 md:p-10"
      role="main"
      aria-labelledby="item-title"
    >
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Item Title */}
          <h1
            className="text-left text-4xl font-extrabold tracking-tight"
            id="item-title"
            tabIndex={-1}
          >
            {itemData.name}
          </h1>
          {/* Item Description */}
          {itemData.description && itemData.description.length > 0 ? (
            <p id="item-description" className="leading-7 mt-2">
              {itemData.description}
            </p>
          ) : null}
          {/* Item WikiLink */}
          <a
            href={itemData.wikiLink}
            className="text-chart-1 hover:text-muted mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="item-description"
          >
            Wiki
          </a>
          {/* Item Variants   */}
          <section aria-label="Item variants">
            <Suspense fallback={<Spinner />}>
              <Variants itemId={itemData.id} />
            </Suspense>
          </section>
        </div>
        {/* Item Image */}
        <figure
          className="flex justify-center items-center md:w-1/2 mx-auto"
          aria-label={`Image of ${itemData.name}`}
        >
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
        </figure>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            id="obtained-from-trigger"
            aria-controls="obtained-from-content"
            className="text-lg"
          >
            Obtained From:
          </AccordionTrigger>
          <AccordionContent
            id="obtained-from-content"
            aria-labelledby="obtained-from-trigger"
            role="region"
            className="flex flex-col gap-4 text-balance"
          >
            <Suspense fallback={<Spinner />}>
              <TaskRewards itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger
            id="required-for-trigger"
            aria-controls="required-for-content"
            className="text-lg"
          >
            Required For:
          </AccordionTrigger>
          <AccordionContent
            id="required-for-content"
            aria-labelledby="required-for-trigger"
            role="region"
            className="flex flex-col gap-4 text-balance"
          >
            <Suspense fallback={<Spinner />}>
              <RequiredFor itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger
            id="buy-price-trigger"
            aria-controls="buy-price-content"
            className="text-lg"
          >
            Buy Price:
          </AccordionTrigger>
          <AccordionContent
            id="buy-price-content"
            aria-labelledby="buy-price-trigger"
            role="region"
            className="flex flex-col gap-4 text-balance"
          >
            <Suspense fallback={<Spinner />}>
              <DataTableBuy itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger
            id="sell-price-trigger"
            aria-controls="sell-price-content"
            className="text-lg"
          >
            Sell Price:
          </AccordionTrigger>
          <AccordionContent
            id="sell-price-content"
            aria-labelledby="sell-price-trigger"
            role="region"
            className="flex flex-col gap-4 text-balance"
          >
            <Suspense fallback={<Spinner />}>
              <DataTableSell itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger
            id="barters-trigger"
            aria-controls="barters-content"
            className="text-lg"
          >
            Barters:
          </AccordionTrigger>
          <AccordionContent
            id="barters-content"
            aria-labelledby="barters-trigger"
            role="region"
            className="flex flex-col gap-4 text-balance"
          >
            <Suspense fallback={<Spinner />}>
              <DataTableBarters itemId={itemData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger
            id="crafted-with-trigger"
            aria-controls="crafted-with-content"
            className="text-lg"
          >
            Crafted With:
          </AccordionTrigger>
          <AccordionContent
            id="crafted-with-content"
            aria-labelledby="crafted-with-trigger"
            role="region"
            className="flex flex-col gap-4 text-balance"
          >
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
