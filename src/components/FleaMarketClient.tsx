"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Link from "next/link";
import DefaultHeader from "./ui/default-header";
import { DataTableFleaMarket } from "./data-table/data-table-flea";
import { BaseItem } from "@/app/api/types";

const FleaMarketClient = () => {
  const { data: itemsFlea } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: () => client.getItems(),
  });

  const columnHelper = createColumnHelper<BaseItem>();
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor((row) => row.gridImageLink, {
          id: "icon",
          header: (info) => <DefaultHeader info={info} name="Icon" />,
          cell: (info) => {
            const icon = info.getValue();
            const row = info.row.original;

            return (
              <Link href={`/item/${row.id}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={icon}
                    alt={row.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </Link>
            );
          },
          enableSorting: false,
          enableHiding: false,
        }),
        columnHelper.accessor((row) => row.name, {
          id: "name",
          filterFn: "includesString",
          header: (info) => <DefaultHeader info={info} name="Name" />,
          cell: (info) => {
            const name = info.getValue();
            const row = info.row.original;

            return (
              <Link href={`/item/${row.id}`}>
                <div className="flex items-center  gap-3">
                  <span className="text-sm font-medium">{name}</span>
                </div>
              </Link>
            );
          },
        }),
        columnHelper.accessor((row) => row.category?.parent?.name ?? "", {
          id: "category",
          header: (info) => <DefaultHeader info={info} name="Category" />,
          cell: (info) => {
            const row = info.row.original;
            const name = row.category?.name;
            const parentName = row.category?.parent?.name;

            return name ? (
              <div className="flex flex-col ">
                <span className="text-sm text-muted">{parentName}</span>
                <span className="text-base  font-medium">{name}</span>
              </div>
            ) : (
              <span className="text-muted italic">N/A</span>
            );
          },
          filterFn: (row, columnId, filterValue) => {
            const value = row.original.category?.parent?.name ?? "";
            return value.toLowerCase().includes(filterValue.toLowerCase());
          },
        }),
        columnHelper.accessor("wikiLink", {
          header: (info) => <DefaultHeader info={info} name="Wiki" />,
          cell: (info) => {
            const wikiLink = info.getValue();
            return wikiLink ? (
              <div className="">
                <a
                  className="text-chart-1 hover:text-gray-700 underline text-sm flex items-center "
                  href={wikiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wiki
                </a>
              </div>
            ) : (
              <span className="text-gray-400 italic">N/A</span>
            );
          },
        }),

        columnHelper.accessor("avg24hPrice", {
          header: (info) => (
            <DefaultHeader info={info} name="Avg Price (24h)" />
          ),
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
          header: (info) => (
            <DefaultHeader info={info} name="Low Price (24h)" />
          ),
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
          header: (info) => (
            <DefaultHeader info={info} name="High Price (24h)" />
          ),
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
      ] as ColumnDef<BaseItem>[],
    []
  );

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableFleaMarket data={itemsFlea} columns={columns} />
    </div>
  );
};

export default FleaMarketClient;
