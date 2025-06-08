"use client";
import { client } from "@/app/api/client";
import { BackpackItem } from "@/app/api/types";
import { DataTableBackpacks } from "@/components/data-table/data-table-backpacks";
import DefaultHeader from "@/components/ui/default-header";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React, { useMemo } from "react";

const BackpacksPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["backpacks"],
    queryFn: () => client.getBackpacks(),
  });
  const columnHelper = createColumnHelper<BackpackItem>();
  const columns: ColumnDef<BackpackItem, any>[] = useMemo(
    () => [
      columnHelper.accessor((row) => row.gridImageLink, {
        id: "icon",
        header: (info) => <DefaultHeader info={info} name="Icon" />,
        cell: (info) => {
          const name = info.getValue();
          const row = info.row.original;

          return (
            <Link href={`/item/${row.id}`}>
              <div className="flex items-center gap-2">
                <img
                  src={row.gridImageLink}
                  alt={name}
                  className="w-32 object-contain"
                />
              </div>
            </Link>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: (info) => <DefaultHeader info={info} name="Name" />,
        cell: (info) => {
          const name = info.getValue();
          const row = info.row.original;

          return (
            <Link href={`/item/${row.id}`}>
              <div className="flex items-center gap-2">
                <span>{name}</span>
              </div>
            </Link>
          );
        },
        filterFn: "includesString",
      }),
      columnHelper.accessor("properties.grids", {
        header: (info) => <DefaultHeader info={info} name="Grid" />,
        cell: (info) => {
          const grids = info.getValue();
          if (!grids || grids.length === 0) return "–";

          const first = grids[0];
          return `${first.width} × ${first.height}`;
        },
      }),
      columnHelper.accessor("properties.capacity", {
        header: (info) => <DefaultHeader info={info} name="Slots inside" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("weight", {
        header: (info) => <DefaultHeader info={info} name="Weight" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor(
        (row) => {
          const cheapest =
            row.buyFor && row.buyFor.length > 0
              ? row.buyFor.reduce((min, current) =>
                  current.priceRUB < min.priceRUB ? current : min
                )
              : null;

          return cheapest
            ? `${cheapest.vendor.name} – ${cheapest.priceRUB.toLocaleString(
                "de-DE"
              )} ₽`
            : "N/A";
        },
        {
          id: "lowestBuyPrice",
          header: (info) => (
            <DefaultHeader
              info={info}
              name="Cheapest Price
"
            />
          ),
          cell: (info) => `${info.getValue()}`,
        }
      ),
      columnHelper.accessor("properties.ergoPenalty", {
        header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
        cell: (info) => {
          const value = info.getValue<number>();
          const percent = Math.round(value * 100);

          const style = {
            color: percent < 0 ? "red" : percent > 0 ? "green" : "inherit",
            fontWeight: 500,
          };

          return <span style={style}>{percent}%</span>;
        },
      }),
      columnHelper.accessor("properties.speedPenalty", {
        header: (info) => <DefaultHeader info={info} name="MoveSpeedPen" />,
        cell: (info) => {
          const value = info.getValue<number>();
          const percent = Math.round(value * 100);

          const style = {
            color: percent < 0 ? "red" : percent > 0 ? "green" : "inherit",
            fontWeight: 500,
          };

          return <span style={style}>{percent}%</span>;
        },
      }),
      columnHelper.accessor("properties.turnPenalty", {
        header: (info) => <DefaultHeader info={info} name="TurnPen" />,
        cell: (info) => {
          const value = info.getValue<number>();
          const percent = Math.round(value * 100);

          const style = {
            color: percent < 0 ? "red" : percent > 0 ? "green" : "inherit",
            fontWeight: 500,
          };

          return <span style={style}>{percent}%</span>;
        },
      }),
    ],
    []
  );

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableBackpacks columns={columns} data={data} />
    </div>
  );
};

export default BackpacksPageClient;
