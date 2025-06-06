"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Item } from "@/app/api/types";
import { useMemo } from "react";
import Link from "next/link";
import DefaultHeader from "./ui/default-header";
import { DataTableFleaMarket } from "./ui/data-table-flea";

const FleaMarketClient = () => {
  const { data: itemsFlea } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: () => client.getItems(),
    staleTime: 300000,
  });
  const columnHelper = createColumnHelper<Item>();
  const columns: ColumnDef<Item, any>[] = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: (info) => <DefaultHeader info={info} name="Name" />,
        cell: (info) => {
          const name = info.getValue();
          const row = info.row.original;

          return (
            <Link href={`/item/${row.id}`}>
              <div className="flex items-center gap-3">
                <img
                  src={row.gridImageLink}
                  alt={name}
                  className="w-18 h-18 object-contain"
                />
                <span className="text-sm font-medium">{name}</span>
              </div>
            </Link>
          );
        },
      }),

      columnHelper.accessor((row) => row.category?.name, {
        id: "category",
        header: (info) => <DefaultHeader info={info} name="Category" />,
        cell: (info) => {
          const name = info.getValue();
          const row = info.row.original;
          const parentName = row.category?.parent.name;

          return name ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">{parentName}</span>
              <span className="text-base font-medium">{name}</span>
            </div>
          ) : (
            <span className="text-gray-400 italic">N/A</span>
          );
        },
      }),

      columnHelper.accessor("wikiLink", {
        header: (info) => <DefaultHeader info={info} name="Wiki" />,
        cell: (info) => {
          const wikiLink = info.getValue();
          return wikiLink ? (
            <a
              className="text-red-600 hover:text-gray-700 underline text-sm"
              href={wikiLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>
          ) : (
            <span className="text-gray-400 italic">N/A</span>
          );
        },
      }),

      columnHelper.accessor("avg24hPrice", {
        header: (info) => <DefaultHeader info={info} name="Avg Price (24h)" />,
        cell: (info) => {
          const value = info.getValue<number | null | undefined>();
          return value != null ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">Avg</span>
              <span className="text-base font-medium">
                {value.toLocaleString("de-DE")}₽
              </span>
            </div>
          ) : (
            <span className="text-gray-400 italic">N/A</span>
          );
        },
      }),

      columnHelper.accessor("low24hPrice", {
        header: (info) => <DefaultHeader info={info} name="Low Price (24h)" />,
        cell: (info) => {
          const value = info.getValue<number | null | undefined>();
          return value != null ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">Low</span>
              <span className="text-base font-medium">
                {value.toLocaleString("de-DE")}₽
              </span>
            </div>
          ) : (
            <span className="text-gray-400 italic">N/A</span>
          );
        },
      }),

      columnHelper.accessor("high24hPrice", {
        header: (info) => <DefaultHeader info={info} name="High Price (24h)" />,
        cell: (info) => {
          const value = info.getValue<number | null | undefined>();
          return value != null ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">High</span>
              <span className="text-base font-medium">
                {value.toLocaleString("de-DE")}₽
              </span>
            </div>
          ) : (
            <span className="text-gray-400 italic">N/A</span>
          );
        },
      }),

      columnHelper.accessor(
        (row) => {
          const cheapest =
            row.buyFor && row.buyFor.length > 0
              ? row.buyFor.reduce((min, current) =>
                  current.priceRUB < min.priceRUB ? current : min
                )
              : null;

          return cheapest;
        },
        {
          id: "lowestBuyPrice",
          header: (info) => <DefaultHeader info={info} name="Best to Buy" />,
          cell: (info) => {
            const cheapest = info.getValue();
            return cheapest ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-700">
                  {cheapest.vendor.name}
                </span>
                <span className="text-base font-medium">
                  {cheapest.priceRUB.toLocaleString("de-DE")}₽
                </span>
              </div>
            ) : (
              <span className="text-gray-400 italic">N/A</span>
            );
          },
        }
      ),

      columnHelper.accessor(
        (row) => {
          const cheapest =
            row.sellFor && row.sellFor.length > 0
              ? row.sellFor.reduce((min, current) =>
                  current.priceRUB > min.priceRUB ? current : min
                )
              : null;

          return cheapest;
        },
        {
          id: "highestSellPrice",
          header: (info) => <DefaultHeader info={info} name="Best to Sell" />,
          cell: (info) => {
            const cheapest = info.getValue();
            return cheapest ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-700">
                  {cheapest.vendor.name}
                </span>
                <span className="text-base font-medium">
                  {cheapest.priceRUB.toLocaleString("de-DE")}₽
                </span>
              </div>
            ) : (
              <span className="text-gray-400 italic">N/A</span>
            );
          },
        }
      ),
    ],
    []
  );

  return (
    <div className="flex flex-col px-6 md:px-20">
      <DataTableFleaMarket data={itemsFlea} columns={columns} />
    </div>
  );
};

export default FleaMarketClient;
