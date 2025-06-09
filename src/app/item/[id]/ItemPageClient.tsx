"use client";

import { client } from "@/app/api/client";
import { VendorBuy, VendorSell } from "@/app/api/types";
import DefaultHeader from "@/components/ui/default-header";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";

type ItemPageClientProps = {
  id: string;
};

const ItemPageClient = ({ id }: ItemPageClientProps) => {
  const { data: itemData = [] } = useSuspenseQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItem(id),
  });
  const { data: tradersData } = useSuspenseQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  const columnHelperSell = createColumnHelper<VendorSell>();
  const columnsSell: ColumnDef<VendorSell, any>[] = useMemo(
    () => [
      columnHelperSell.accessor("vendor.name", {
        id: "icon",
        header: (info) => <DefaultHeader info={info} name="Icon:" />,
        cell: (info) => {
          const vendorName = info.getValue();
          const trader = tradersData.find((t) => t.name === vendorName);

          return (
            <div className="flex items-center gap-2">
              {trader && (
                <img
                  src={trader.image4xLink}
                  alt={trader.name}
                  className="rounded-sm w-16"
                />
              )}
            </div>
          );
        },
      }),
      columnHelperSell.accessor("vendor.name", {
        id: "name",
        filterFn: "includesString",
        header: (info) => <DefaultHeader info={info} name="Vendor:" />,
        cell: (info) => {
          const vendorName = info.getValue();

          return (
            <div className="flex items-center gap-2">
              <span>{vendorName}</span>
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

          console.log(`Vendor: ${vendorName}, USD: ${price}, RUB: ${priceRUB}`);

          const value = isUSD ? price : priceRUB;
          const symbol = isUSD ? "$" : "₽";

          if (typeof value !== "number" || isNaN(value)) return "—";

          return `${value.toLocaleString()} ${symbol}`;
        },
      }),
    ],
    [tradersData]
  );
  const columnHelperBuy = createColumnHelper<VendorBuy>();
  const columnsBuy: ColumnDef<VendorBuy, any>[] = useMemo(
    () => [
      columnHelperBuy.accessor("vendor.name", {
        id: "icon",
        header: (info) => <DefaultHeader info={info} name="Icon:" />,
        cell: (info) => {
          const vendorName = info.getValue();
          const trader = tradersData.find((t) => t.name === vendorName);

          return (
            <div className="flex items-center gap-2">
              {trader && (
                <img
                  src={trader.image4xLink}
                  alt={trader.name}
                  className="rounded-sm w-16"
                />
              )}
            </div>
          );
        },
      }),
      columnHelperBuy.accessor("vendor.name", {
        id: "name",
        filterFn: "includesString",
        header: (info) => <DefaultHeader info={info} name="Vendor:" />,
        cell: (info) => {
          const vendorName = info.getValue();

          return (
            <div className="flex items-center gap-2">
              <span>{vendorName}</span>
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
              <p className="leading-7 mt-2">{item.description}</p>
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

          <div className="mb-6">
            <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
              Sell for:
            </h2>
            {tradersData && (
              <SimpleDataTable data={item.sellFor} columns={columnsSell} />
            )}
          </div>

          <div className="mb-6">
            <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
              Buy for:
            </h2>
            {tradersData && (
              <SimpleDataTable data={item.buyFor} columns={columnsBuy} />
            )}
          </div>

          <div className="mb-6">
            <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
              Statistics:
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemPageClient;
