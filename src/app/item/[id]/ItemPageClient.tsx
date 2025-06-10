"use client";

import { client } from "@/app/api/client";
import { Barter, BarterItem, VendorPrice } from "@/app/api/types";
import { Badge } from "@/components/ui/badge";
import DefaultHeader from "@/components/ui/default-header";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { columnsBarter } from "@/components/data-table/columns";

type ItemPageClientProps = {
  id: string;
};

const ItemPageClient = ({ id }: ItemPageClientProps) => {
  const { data: itemData } = useSuspenseQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItem(id),
  });

  const { data: tradersData } = useSuspenseQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  const columnHelperSell = createColumnHelper<VendorPrice>();
  const columnsSell: ColumnDef<VendorPrice, any>[] = useMemo(
    () => [
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
    ],
    [tradersData]
  );
  const columnHelperBuy = createColumnHelper<VendorPrice>();
  const columnsBuy: ColumnDef<VendorPrice, any>[] = useMemo(
    () => [
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
    ],
    [tradersData]
  );
  return (
    <div>
      {itemData.map((item) => (
        <div key={item.id} className="flex flex-col p-10">
          <div className="mb-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-left text-4xl font-extrabold tracking-tight">
                {item.name}
              </h1>
              <h2 className="mt-4 border-b pb-2 text-2xl font-semibold tracking-tight">
                Description:
              </h2>
              {item.description ? (
                <p className="leading-7 mt-2">{item.description}</p>
              ) : (
                <p className="leading-7 mt-2">No Description...</p>
              )}

              <a
                href={item.wikiLink}
                className="text-chart-1 hover:text-muted mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiki
              </a>
            </div>

            <div className="flex justify-center items-center md:w-1/2">
              <img
                src={item.image8xLink}
                alt={item.name}
                className="max-w-1/4 h-auto object-contain"
              />
            </div>
          </div>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Stats:</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                stats
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Buy For:</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {tradersData && (
                  <SimpleDataTable data={item.buyFor} columns={columnsBuy} />
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Sell for:</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {tradersData && (
                  <SimpleDataTable data={item.sellFor} columns={columnsSell} />
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">Barters:</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {item.bartersFor && item.bartersFor.length > 0 ? (
                  <SimpleDataTable
                    data={item.bartersFor}
                    columns={columnsBarter}
                  />
                ) : (
                  <p className="text-muted-foreground italic">No Barters</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ItemPageClient;
