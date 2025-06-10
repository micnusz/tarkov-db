"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { DataTableAmmo } from "@/components/data-table/data-table-ammo";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import DefaultHeader from "@/components/ui/default-header";
import Link from "next/link";
import { Ammo } from "../api/types";

const AmmoPageClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["ammo"],
    queryFn: () => client.getAmmo(),
  });
  const columnHelper = createColumnHelper<Ammo>();
  const columns: ColumnDef<Ammo, any>[] = useMemo(
    () => [
      columnHelper.accessor("item.iconLink", {
        id: "icon",
        header: (info) => <DefaultHeader info={info} name="Icon" />,
        cell: (info) => {
          const caliberRaw = info.getValue<string>();
          return (
            <Link href={`/item/${info.row.original.item.id}`}>
              <img
                aria-label={`Icon of ${caliberRaw}`}
                src={info.row.original.item.iconLink}
                alt={`Icon of ${caliberRaw}`}
              />
            </Link>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("caliber", {
        id: "caliber",
        header: (info) => <DefaultHeader info={info} name="Caliber" />,
        cell: (info) => {
          const caliberRaw = info.getValue<string>();

          return (
            <Link href={`/item/${info.row.original.item.id}`}>
              <div className={`flex flex-row items-center gap-2`}>
                <span>{caliberRaw}</span>
              </div>
            </Link>
          );
        },
        filterFn: "equals",
      }),

      columnHelper.accessor("item.name", {
        id: "name",
        header: (info) => <DefaultHeader info={info} name="Name" />,
        cell: (info) => {
          const fullName = info.getValue<string>();
          if (!fullName) return null;

          const nameParts = fullName.split(" ");
          const bulletName = nameParts.slice(1).join(" ");

          return (
            <Link href={`/item/${info.row.original.item.id}`}>
              <span>{bulletName}</span>
            </Link>
          );
        },
        filterFn: "includesString",
      }),

      columnHelper.accessor("penetrationPower", {
        header: (info) => <DefaultHeader info={info} name="Pen" />,
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("damage", {
        header: (info) => <DefaultHeader info={info} name="Dmg" />,
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("armorDamage", {
        header: (info) => <DefaultHeader info={info} name="ArD" />,
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("accuracyModifier", {
        header: (info) => <DefaultHeader info={info} name="Acc" />,
        cell: (info) => {
          const percent = Math.round(info.getValue() * 100);
          return (
            <span
              style={{
                color: percent < 0 ? "red" : percent > 0 ? "green" : undefined,
                fontWeight: 500,
              }}
            >
              {percent}%
            </span>
          );
        },
      }),

      columnHelper.accessor("recoilModifier", {
        header: (info) => <DefaultHeader info={info} name="Recoil" />,
        cell: (info) => {
          const percent = Math.round(info.getValue() * 100);
          return (
            <span
              style={{
                color: percent < 0 ? "red" : percent > 0 ? "green" : undefined,
                fontWeight: 500,
              }}
            >
              {percent}%
            </span>
          );
        },
      }),

      columnHelper.accessor("fragmentationChance", {
        header: (info) => <DefaultHeader info={info} name="Frag" />,
        cell: (info) => `${Math.round(info.getValue() * 100)}%`,
      }),

      columnHelper.accessor("initialSpeed", {
        header: (info) => <DefaultHeader info={info} name="Speed m/s" />,
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("ricochetChance", {
        header: (info) => <DefaultHeader info={info} name="Ricochet" />,
        cell: (info) => `${Math.round(info.getValue() * 100)}%`,
      }),
    ],
    []
  );

  return (
    <main>
      <div className="w-full h-full flex-col justify-center items-center p-2 md:p-10">
        <DataTableAmmo data={data} columns={columns} />
      </div>
    </main>
  );
};

export default AmmoPageClient;
