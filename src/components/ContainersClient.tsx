"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import DefaultHeader from "./ui/default-header";
import Link from "next/link";
import { DataTableContainers } from "./data-table/data-table-containers";
import { BaseItem } from "@/app/api/types";

const ContainersClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["containers"],
    queryFn: () => client.getBarterItems(),
  });
  const columnHelper = createColumnHelper<BaseItem>();
  const columns: ColumnDef<BaseItem, any>[] = useMemo(
    () => [
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
      columnHelper.accessor((row) => row.category?.name ?? "", {
        id: "category",
        header: (info) => <DefaultHeader info={info} name="Category" />,
        cell: (info) => {
          const row = info.row.original;
          const name = row.category?.name;

          return name ? (
            <span className="text-base font-medium">{name}</span>
          ) : (
            <span className="text-muted italic">N/A</span>
          );
        },
        filterFn: (row, columnId, filterValue) => {
          const value = row.original.category?.name ?? "";
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
        header: (info) => <DefaultHeader info={info} name="Avg Price (24h)" />,
        cell: (info) => {
          const value = info.getValue<number | null | undefined>();
          return typeof value === "number" ? (
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
            const price = cheapest?.priceRUB;

            return cheapest && typeof price === "number" ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-700">
                  {cheapest.vendor.name}
                </span>
                <span className="text-base font-medium">
                  {price.toLocaleString("de-DE")}₽
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
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableContainers columns={columns} data={data} />
    </div>
  );
};

export default ContainersClient;
