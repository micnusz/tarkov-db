"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Barter } from "@/app/api/types";
import { useMemo } from "react";
import Link from "next/link";
import DefaultHeader from "./ui/default-header";
import { DataTableBarters } from "./data-table/data-table-barters";
import { Badge } from "./ui/badge";

const BartersClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["barters"],
    queryFn: () => client.getBarters(),
  });

  const columnHelper = createColumnHelper<Barter>();
  const columns: ColumnDef<Barter>[] = useMemo(
    () => [
      columnHelper.accessor((row) => row.trader?.name ?? "", {
        id: "trader",
        header: (info) => <DefaultHeader info={info} name="Trader" />,
        cell: (info) => {
          const trader = info.row.original.trader;
          const level =
            info.row.original.level ?? info.row.original.level ?? null;

          return trader ? (
            <div className="relative w-16 h-16">
              <img
                className="w-16 h-16 aspect-square object-contain"
                src={trader.imageLink}
                alt={trader.name}
              />
              {level !== null && (
                <Badge className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                  Lv. {level}
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-gray-400 italic">N/A</span>
          );
        },
      }),

      columnHelper.accessor((row) => row.rewardItems?.[0]?.item.name ?? "", {
        id: "name",
        header: (info) => <DefaultHeader info={info} name="Reward" />,
        cell: (info) => {
          const rowData = info.row.original;
          const reward = rowData.rewardItems?.[0];
          const item = reward?.item;
          const amount = reward?.count ?? reward?.quantity;

          if (!item || !item.id) {
            return <span className="text-gray-400 italic">N/A</span>;
          }

          return (
            <Link href={`/item/${item.id}`}>
              <div className="flex items-center gap-3">
                <div className="relative ">
                  {item.gridImageLink && (
                    <img
                      src={item.gridImageLink}
                      alt={item.name}
                      className="w-[5rem] aspect-square object-contain"
                    />
                  )}
                  {amount !== undefined && (
                    <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                      {amount}
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          );
        },
        filterFn: "includesString",
      }),

      columnHelper.accessor((row) => row.requiredItems ?? [], {
        id: "required",
        header: (info) => <DefaultHeader info={info} name="Required" />,
        cell: (info) => {
          const requiredItems = info.getValue();

          if (!requiredItems.length) {
            return <span className="text-gray-400 italic">N/A</span>;
          }

          return (
            <div className="flex flex-col gap-2">
              {requiredItems.map(({ item, count, quantity }) => {
                const amount = quantity ?? count;

                return (
                  <Link key={item.id} href={`/item/${item.id}`}>
                    <div className="flex items-center gap-3">
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
                  </Link>
                );
              })}
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.accessor((row) => row.requiredItems ?? [], {
        id: "cost",
        header: (info) => <DefaultHeader info={info} name="Barter Cost" />,
        cell: (info) => {
          const requiredItems = info.getValue();

          if (!requiredItems.length) {
            return <span className="text-gray-400 italic">N/A</span>;
          }

          const totalCost = requiredItems.reduce(
            (sum: number, { item, count, quantity }) => {
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
      columnHelper.accessor(
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
      columnHelper.accessor((row) => row, {
        id: "profit",
        header: (info) => <DefaultHeader info={info} name="Barter profit" />,
        cell: (info) => {
          const row = info.getValue();

          const rewardItem = row.rewardItems?.[0]?.item;
          const rewardPrice = rewardItem?.avg24hPrice ?? 0;

          const requiredItems = row.requiredItems ?? [];
          const barterCost = requiredItems.reduce(
            (total, { item, count = 1, quantity = 1 }) => {
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
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableBarters data={data} columns={columns} />
    </div>
  );
};

export default BartersClient;
