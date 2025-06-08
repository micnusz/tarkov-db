"use client";
import { client } from "@/app/api/client";
import { WeaponItem } from "@/app/api/types";
import { DataTableWeapons } from "@/components/data-table/data-table-weapons";
import DefaultHeader from "@/components/ui/default-header";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";

const WeaponsPageClient = () => {
  const { data = [] } = useSuspenseQuery({
    queryKey: ["weapons"],
    queryFn: () => client.getWeapons(),
  });
  const columnHelper = createColumnHelper<WeaponItem>();
  const columns: ColumnDef<WeaponItem, any>[] = useMemo(
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
                  className="w-18 h-18 object-contain"
                />
              </div>
            </Link>
          );
        },
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: (info) => <DefaultHeader info={info} name="Name" />,
        cell: (info) => {
          const row = info.row.original;
          const caliberRaw = info.getValue<string>();
          return (
            <div className="flex flex-row gap-8">
              <Link href={`/item/${row.id}`}>
                <span>{caliberRaw}</span>
              </Link>
            </div>
          );
        },
        filterFn: "includesString",
      }),
      columnHelper.accessor("category.name", {
        id: "category",
        header: (info) => <DefaultHeader info={info} name="Category" />,
        cell: (info) => {
          const row = info.row.original;
          const category = info.getValue<string>();
          return (
            <div className="flex flex-row gap-8">
              <Link href={`/item/${row.id}`}>
                <span>{category}</span>
              </Link>
            </div>
          );
        },
        filterFn: "includesString",
      }),
      columnHelper.accessor("properties.caliber", {
        header: (info) => <DefaultHeader info={info} name="Caliber" />,
        cell: (info) => {
          const row = info.row.original;
          const caliberRaw = info.getValue<string>();
          const caliberStripped = caliberRaw.replace(/^Caliber/, "");
          const caliberFormatted = caliberStripped.replace(
            /^(\d)(\d{2}x\d+)/,
            "$1.$2"
          );

          return <span>{caliberFormatted}</span>;
        },
      }),
      columnHelper.accessor("properties.fireRate", {
        header: (info) => <DefaultHeader info={info} name="Fire Rate" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("properties.recoilVertical", {
        header: (info) => <DefaultHeader info={info} name="Vertical Recoil" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("properties.recoilHorizontal", {
        header: (info) => (
          <DefaultHeader info={info} name="Horizontal Recoil" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("properties.ergonomics", {
        header: (info) => <DefaultHeader info={info} name="Ergonomics" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("properties.effectiveDistance", {
        header: (info) => <DefaultHeader info={info} name="Effective Range" />,
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <h1>Weapons:</h1>
      <DataTableWeapons data={data} columns={columns} />
    </div>
  );
};

export default WeaponsPageClient;
