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
  const columnHelperBarter = createColumnHelper<Barter>();
  const columnsBarter: ColumnDef<Barter, any>[] = useMemo(
    () => [
      columnHelperBarter.accessor((row) => row.trader?.imageLink ?? "", {
        id: "trader",
        header: (info) => <DefaultHeader info={info} name="Trader" />,
        cell: (info) => {
          const trader = info.row.original?.trader;
          const level = info.row.original?.level;

          if (!trader || !trader.imageLink || !trader.name) {
            return <span className="text-gray-400 italic">Brak danych</span>;
          }

          return (
            <div className="relative w-16 h-16">
              <img
                className="w-16 h-16 aspect-square object-contain"
                src={trader.imageLink}
                alt={trader.name}
              />
              {level != null && (
                <Badge className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                  Lv. {level}
                </Badge>
              )}
            </div>
          );
        },
      }),
      columnHelperBarter.accessor(
        (row) => row.rewardItems?.[0]?.item?.name ?? "",
        {
          id: "name",
          header: (info) => <DefaultHeader info={info} name="Reward" />,
          cell: (info) => {
            const reward = info.row.original.rewardItems?.[0];
            const item = reward?.item;
            const amount = reward?.count ?? reward?.quantity;

            if (!item || !item.id) {
              return <span className="text-gray-400 italic">N/A</span>;
            }

            return (
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  {item.gridImageLink && (
                    <img
                      src={item.gridImageLink}
                      alt={item.name}
                      className="w-[5rem] aspect-square object-contain shrink-0"
                    />
                  )}
                  {amount !== undefined && (
                    <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                      {amount}
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-medium truncate">
                  {item.name}
                </span>
              </div>
            );
          },
          filterFn: "includesString",
        }
      ),
      columnHelperBarter.accessor((row) => row.requiredItems ?? "", {
        id: "required",
        header: (info) => <DefaultHeader info={info} name="Required" />,
        cell: (info) => {
          const requiredItems = info.getValue();

          if (!requiredItems.length) {
            return <span className="text-gray-400 italic">N/A</span>;
          }

          return (
            <div className="flex flex-col gap-2">
              {requiredItems.map(({ item, count, quantity }: BarterItem) => {
                const amount = quantity ?? count;

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      {item.gridImageLink && (
                        <img
                          src={item.gridImageLink}
                          alt={item.name}
                          className="w-12 h-12 aspect-square object-contain"
                        />
                      )}
                      {amount !== undefined && (
                        <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                          {amount}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        {amount !== undefined ? `${amount} x ` : ""}
                        {typeof item.avg24hPrice === "number"
                          ? `${item.avg24hPrice.toLocaleString("de-DE")}₽`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelperBarter.accessor((row) => row.requiredItems ?? "", {
        id: "cost",
        header: (info) => <DefaultHeader info={info} name="Barter Cost" />,
        cell: (info) => {
          const requiredItems = info.getValue();

          if (!requiredItems.length) {
            return <span className="text-gray-400 italic">N/A</span>;
          }

          const totalCost = requiredItems.reduce(
            (sum: number, { item, count, quantity }: BarterItem) => {
              const qty = quantity ?? count ?? 0;
              const price =
                typeof item.avg24hPrice === "number" ? item.avg24hPrice : 0;
              return sum + qty * price;
            },
            0
          );

          return (
            <div className="text-sm font-medium">
              {totalCost > 0 ? (
                `${totalCost.toLocaleString("de-DE")}₽`
              ) : (
                <span className="text-gray-400 italic">N/A</span>
              )}
            </div>
          );
        },
        enableSorting: true,
        enableHiding: true,
      }),
      columnHelperBarter.accessor(
        (row) => row.rewardItems?.[0]?.item.avg24hPrice ?? null,
        {
          id: "fleaCost",
          header: (info) => (
            <DefaultHeader info={info} name="Avg Flea Cost (24h)" />
          ),
          cell: (info) => {
            const price = info.getValue();

            return typeof price === "number" ? (
              <span className="text-sm font-medium">
                {price.toLocaleString("de-DE")}₽
              </span>
            ) : (
              <span className="text-gray-400 italic">N/A</span>
            );
          },
          enableSorting: true,
          enableHiding: true,
        }
      ),
      columnHelperBarter.accessor((row) => row, {
        id: "profit",
        header: (info) => <DefaultHeader info={info} name="Barter profit" />,
        cell: (info) => {
          const row = info.getValue();

          const rewardItem = row.rewardItems?.[0]?.item;
          const rewardPrice = rewardItem?.avg24hPrice ?? 0;

          const requiredItems = row.requiredItems ?? [];
          const barterCost = requiredItems.reduce(
            (total: number, { item, count = 1, quantity = 1 }: BarterItem) => {
              const itemPrice = item?.avg24hPrice ?? 0;
              const qty = quantity ?? count;
              return total + itemPrice * qty;
            },
            0
          );

          const profit = rewardPrice - barterCost;
          const formattedProfit = profit.toLocaleString("de-DE") + "₽";

          return (
            <span
              className={
                profit > 0
                  ? "text-green-600"
                  : profit < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }
            >
              {formattedProfit}
            </span>
          );
        },
        enableSorting: true,
        enableHiding: false,
      }),
    ],
    []
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
              <AccordionTrigger className="text-lg">Buy For:</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {tradersData && (
                  <SimpleDataTable data={item.buyFor} columns={columnsBuy} />
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Sell for:</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                {tradersData && (
                  <SimpleDataTable data={item.sellFor} columns={columnsSell} />
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
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
