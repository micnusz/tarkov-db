"use client";

import { client } from "@/app/api/client";
import { VendorPrice } from "@/app/api/types";
import DefaultHeader from "@/components/ui/default-header";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  columnsBarter,
  columnsTaskSimple,
} from "@/components/data-table/columns";
import Loading from "./loading";
import ReceivedFromTasks from "@/components/item-rewards/ReceivedFromTask";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const columnHelperSell = createColumnHelper<VendorPrice>();
  const columnsSell = useMemo(
    () =>
      [
        columnHelperSell.accessor("vendor.name", {
          id: "name",
          filterFn: "includesString",
          header: (info) => <DefaultHeader info={info} name="Trader" />,
          cell: (info) => {
            const vendorName = info.getValue();
            const trader = tradersData.find((t) => t.name === vendorName);

            return (
              <div className="flex items-center gap-2">
                {trader && (
                  <img
                    src={trader.image4xLink}
                    alt={trader.name}
                    className="rounded-sm w-16 h-16 object-contain"
                  />
                )}
                <span className="text-md font-medium p-2">{vendorName}</span>
              </div>
            );
          },
        }),
        columnHelperSell.accessor("price", {
          header: (info) => <DefaultHeader info={info} name="Price:" />,
          cell: (info) => {
            const row = info.row.original;
            const vendorName = row.vendor.name;
            const isUSD = vendorName === "Peacekeeper";

            const price = row.price;
            const priceRUB = row.priceRUB;

            const value = isUSD ? price : priceRUB;
            const symbol = isUSD ? "$" : "₽";

            if (typeof value !== "number" || isNaN(value)) return "—";

            return `${value.toLocaleString()} ${symbol}`;
          },
        }),
      ] as ColumnDef<VendorPrice>[],
    []
  );
  const columnHelperBuy = createColumnHelper<VendorPrice>();
  const columnsBuy = useMemo(
    () =>
      [
        columnHelperBuy.accessor("vendor.name", {
          id: "name",
          filterFn: "includesString",
          header: (info) => <DefaultHeader info={info} name="Trader" />,
          cell: (info) => {
            const vendorName = info.getValue();
            const trader = tradersData.find((t) => t.name === vendorName);

            return (
              <div className="flex items-center gap-2">
                {trader && (
                  <img
                    src={trader.image4xLink}
                    alt={trader.name}
                    className="rounded-sm w-16 h-16 object-contain"
                  />
                )}
                <span className="text-md font-medium p-2">{vendorName}</span>
              </div>
            );
          },
        }),

        columnHelperBuy.accessor("price", {
          header: (info) => <DefaultHeader info={info} name="Price:" />,
          cell: (info) => {
            const row = info.row.original;
            const vendorName = row.vendor.name;
            const isUSD = vendorName === "Peacekeeper";

            const value = isUSD ? row.price : row.priceRUB;
            const symbol = isUSD ? "$" : "₽";

            if (typeof value !== "number") return "—";

            return `${value.toLocaleString()} ${symbol}`;
          },
        }),
      ] as ColumnDef<VendorPrice>[],
    []
  );

  return (
    <div key={itemData.id} className="flex flex-col p-10">
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-left text-4xl font-extrabold tracking-tight">
            {itemData.name}
          </h1>
          {itemData.description ? (
            <p className="leading-7 mt-2">{itemData.description}</p>
          ) : (
            <p className="leading-7 mt-2">No Description...</p>
          )}

          <a
            href={itemData.wikiLink}
            className="text-chart-1 hover:text-muted mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>

        <div className="flex justify-center items-center md:w-1/2">
          <img
            src={itemData.image8xLink}
            alt={itemData.name}
            className="min-w-1/4 max-w-1/3 h-auto object-contain"
          />
        </div>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        {itemData.receivedFromTasks && itemData.receivedFromTasks.length > 0 ? (
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              Task rewards:
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ScrollArea className="rounded-md border">
                <ul>
                  <ReceivedFromTasks
                    receivedFromTasks={itemData.receivedFromTasks}
                    itemId={itemData.id}
                  />
                </ul>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        ) : null}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Buy For:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {tradersData && (
              <SimpleDataTable data={itemData.buyFor} columns={columnsBuy} />
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">Sell for:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {tradersData && (
              <SimpleDataTable data={itemData.sellFor} columns={columnsSell} />
            )}
          </AccordionContent>
        </AccordionItem>
        {itemData.usedInTasks && itemData.usedInTasks.length > 0 ? (
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">
              Required for:
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <SimpleDataTable
                data={itemData.usedInTasks}
                columns={columnsTaskSimple}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {itemData.bartersFor?.length > 0 ||
        itemData.bartersUsing?.length > 0 ? (
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">Barters:</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <SimpleDataTable
                data={[
                  ...(itemData.bartersFor || []),
                  ...(itemData.bartersUsing || []),
                ]}
                columns={columnsBarter}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {itemData.craftsFor?.length > 0 || itemData.craftsUsing?.length > 0 ? (
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg">Crafting:</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <SimpleDataTable
                data={[
                  ...(itemData.craftsFor || []),
                  ...(itemData.craftsUsing || []),
                ]}
                columns={columnsBarter}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </div>
  );
};

export default ItemPageClient;
