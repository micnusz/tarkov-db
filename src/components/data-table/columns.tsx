import type {
  Ammo,
  ArmorsItem,
  BackpackItem,
  Barter,
  BarterItem,
  BaseItem,
  CraftingProperties,
  GrenadeItem,
  HeadsetItem,
  Item,
  ItemPropertiesFoodDrink,
  ItemPropertiesGlasses,
  ItemPropertiesMedicalItem,
  ItemPropertiesMedKit,
  ItemPropertiesWeaponMod,
  KeyItem,
  MagazineItem,
  ScopeItem,
  Task,
  WeaponItem,
} from "@/app/api/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "../ui/default-header";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Briefcase, Check, TowerControl, X } from "lucide-react";
import CraftingDurationFormat from "../modules/crafting-duration-format";
import Image from "next/image";
import CaliberFormat from "../modules/ammo-format";
import formatCurrency from "../modules/currency-format";
import { UniversalStringFilterFn } from "../modules/universal-string-filterfn";
import RicochetChanceFormat from "../modules/ricochet-chance-format";
import { UniversalNumberFormatFn } from "../modules/universal-number-format-fn";
import HeadsetsDistanceFormat from "../modules/headsets-distance-format";
import HeadsetsDistortionFormat from "../modules/headsets-distortion-format";
import { ricochetFilterFn } from "../modules/ricochet-filter-fn";
import { universalPenaltyFilter } from "../modules/universal-penalty-filter";
import malfunctionChanceFormat from "../modules/malfunction-chance-format";
import { camelCaseToTitleFormat } from "../modules/camel-case-to-title-format";

//Column Barter
const columnHelperBarter = createColumnHelper<Barter>();
export const columnsBarter = [
  columnHelperBarter.accessor((row) => row.trader.name ?? "", {
    id: "trader",
    filterFn: "equals",
    header: (info) => <DefaultHeader info={info} name="Trader" />,
    cell: (info) => {
      const trader = info.row.original?.trader;
      const level = info.row.original?.level;

      if (!trader || !trader.imageLink || !trader.name) {
        return <span className="text-gray-400 italic">N/A</span>;
      }

      return (
        <div className="relative">
          <Image
            src={trader.imageLink}
            alt={trader.name}
            width={50}
            height={50}
            loading="lazy"
            className="object-contain h-25"
          />
          {level != null && (
            <Badge className=" absolute left-0 top-0  text-xs px-1.5 py-0.5">
              Lv. {level}
            </Badge>
          )}
        </div>
      );
    },
  }),
  columnHelperBarter.accessor((row) => row.level ?? null, {
    id: "traderLevel",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    header: "Trader Level",
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelperBarter.accessor((row) => row.rewardItems?.[0]?.item?.name ?? "", {
    id: "name",
    enableHiding: false,
    header: (info) => <DefaultHeader info={info} name="Reward" />,
    cell: (info) => {
      const reward = info.row.original.rewardItems?.[0];
      const item = reward?.item;
      const amount = reward?.count ?? reward?.quantity;

      if (!item || !item.id) {
        return <span className="text-muted-foreground italic">N/A</span>;
      }

      // Obcinamy tekst do połowy długości
      const halfName = item.name.slice(0, Math.ceil(item.name.length / 2));

      return (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {item.gridImageLink && (
              <Image
                src={item.gridImageLink}
                alt={item.name}
                width={50}
                height={50}
                loading="lazy"
                className="object-contain h-25"
              />
            )}
            {amount !== undefined && (
              <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                {amount}
              </Badge>
            )}
          </div>
          <div className="flex flex-col">
            <Link href={`/item/${item.id}`}>
              <span className="text-xs hover:text-chart-2 ">{halfName}…</span>
            </Link>
          </div>
        </div>
      );
    },

    filterFn: "includesString",
  }),
  columnHelperBarter.accessor(
    (row) => row.rewardItems?.[0]?.item?.category?.parent?.name ?? "",
    {
      id: "category",
      header: (info) => <DefaultHeader info={info} name="Category" />,
      filterFn: (row, _columnId, filterValue) => {
        const parentCategoryName =
          row.original.rewardItems?.[0]?.item?.category?.parent?.name ?? "";
        return parentCategoryName === filterValue;
      },
      cell: (info) => {
        const item = info.row.original.rewardItems?.[0]?.item;
        const name = item?.category?.name;
        const parentName = item?.category?.parent?.name;

        return name ? (
          <div className="flex flex-col leading-tight">
            <span className="text-sm text-muted">{parentName}</span>
            <span className="text-base font-medium">{name}</span>
          </div>
        ) : (
          <span className="text-muted italic">N/A</span>
        );
      },
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
                <div className="relative">
                  {item.gridImageLink && (
                    <Image
                      src={item.gridImageLink}
                      alt={item.name}
                      width={50}
                      height={50}
                      loading="lazy"
                      className="aspect-square object-contain max-w-25"
                    />
                  )}
                  {amount !== undefined && (
                    <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                      {amount}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col w-fit">
                  <Link href={`/item/${item.id}`}>
                    <span className="text-sm hover:text-chart-2 ">
                      {item.name}
                    </span>
                  </Link>
                  <span className="text-xs text-muted-foreground">
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
  columnHelperBarter.accessor(
    (row) => {
      const requiredItems = row.requiredItems ?? [];
      return requiredItems.reduce(
        (total, { item, count = 1, quantity = 1 }) => {
          const itemPrice = item?.avg24hPrice ?? 0;
          const qty = quantity ?? count;
          return total + itemPrice * qty;
        },
        0
      );
    },
    {
      id: "barterCost",
      header: (info) => <DefaultHeader info={info} name="Barter Cost" />,
      cell: (info) => {
        const cost = info.getValue();
        return cost > 0 ? (
          <span>{formatCurrency("roubles", cost)}</span>
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        );
      },
      enableSorting: true,
      filterFn: UniversalNumberFormatFn,
    }
  ),

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
  columnHelperBarter.accessor(
    (row) => {
      const rewardPrice = row.rewardItems?.[0]?.item.avg24hPrice ?? 0;

      const barterCost = (row.requiredItems ?? []).reduce(
        (total: number, { item, count = 1, quantity = 1 }: BarterItem) => {
          const itemPrice = item?.avg24hPrice ?? 0;
          const qty = quantity ?? count;
          return total + itemPrice * qty;
        },
        0
      );

      return rewardPrice - barterCost;
    },
    {
      id: "profit",
      header: (info) => <DefaultHeader info={info} name="Barter profit" />,
      cell: (info) => {
        const profit = info.getValue();

        const formattedProfit = profit.toLocaleString("de-DE") + "₽";

        return (
          <span
            className={
              profit > 0
                ? "text-chart-2"
                : profit < 0
                ? "text-chart-3"
                : "text-muted-foreground"
            }
          >
            {formattedProfit}
          </span>
        );
      },
      enableSorting: true,
      enableHiding: false,
    }
  ),
] as ColumnDef<Barter>[];

//Column items/barter-items
const columnHelperBarterItems = createColumnHelper<Item>();
export const columnsBarterItems = [
  columnHelperBarterItems.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const icon = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-3">
            <Image
              aria-label={`Image of barter: ${row.name}`}
              src={icon}
              alt={`${row.name}`}
              width={72}
              height={72}
              className="aspect-square object-contain h-25"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelperBarterItems.accessor((row) => row.name, {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center  gap-3">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm font-medium hover:text-chart-2">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperBarterItems.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),
  columnHelperBarterItems.accessor("avg24hPrice", {
    header: (info) => <DefaultHeader info={info} name="Avg Price (24h)" />,
    filterFn: UniversalNumberFormatFn,
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
  columnHelperBarterItems.accessor(
    (row) => {
      const sellFor = row.sellFor ?? [];

      if (sellFor.length === 0) return null;

      const bestOffer = sellFor.reduce((max, current) =>
        current.priceRUB > max.priceRUB ? current : max
      );

      return bestOffer.priceRUB ?? null;
    },
    {
      id: "highestSellPrice",
      header: (info) => <DefaultHeader info={info} name="Best to Sell" />,
      cell: (info) => {
        const price = info.getValue();
        const row = info.row.original;
        const sellFor = row.sellFor ?? [];

        const bestOffer =
          sellFor.length > 0
            ? sellFor.reduce((max, current) =>
                current.priceRUB > max.priceRUB ? current : max
              )
            : null;

        const vendor = bestOffer?.vendor?.name ?? "Unknown";

        return typeof price === "number" ? (
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{vendor}</span>
            <span className="text-base font-medium">
              {price.toLocaleString("de-DE")}₽
            </span>
          </div>
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        );
      },
      sortingFn: "basic",
    }
  ),
  columnHelperBarterItems.accessor("wikiLink", {
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();
      return wikiLink ? (
        <div className="">
          <a
            className="text-muted-foreground hover:text-foreground underline text-sm "
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
] as ColumnDef<Item>[];

//Crafting
const columnHelperCrafting = createColumnHelper<CraftingProperties>();
export const columnsCrafting = [
  columnHelperCrafting.accessor((row) => row.station?.name ?? "", {
    id: "station",
    header: (info) => <DefaultHeader info={info} name="Station" />,
    cell: (info) => {
      const station = info.row.original?.station;
      const level = info.row.original?.level;
      const task = info.row.original?.taskUnlock;

      if (!station) {
        return <span className="text-gray-400 italic">N/A</span>;
      }

      return (
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">{station.name}</span>
          {typeof level === "number" && (
            <span className="text-sm">Lv. {level}</span>
          )}
          {task?.name && (
            <>
              <span className="flex">
                After completing {task.trader.name}&apos;s task -
              </span>
              <span className="flex text-chart-2 hover:text-foreground/80">
                <Link href={`/task/${task.id}`}>{task.name}</Link>
              </span>
            </>
          )}
        </div>
      );
    },
  }),
  columnHelperCrafting.accessor(
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
          <div className="flex items-center gap-3 ">
            <div className="relative">
              {item.gridImageLink && (
                <Image
                  src={item.gridImageLink}
                  alt={item.name}
                  width={50}
                  height={50}
                  loading="lazy"
                  className="object-contain h-25"
                />
              )}
              {amount !== undefined && (
                <Badge className="bg-chart-3 absolute top-4 -right-1 text-xs px-1.5 py-0.5">
                  {amount}
                </Badge>
              )}
            </div>
            <Link href={`/item/${item.id}`}>
              <span className="text-sm  truncate hover:text-chart-2 ">
                {item.name}
              </span>
            </Link>
          </div>
        );
      },
      filterFn: "includesString",
    }
  ),
  columnHelperCrafting.accessor((row) => row.duration, {
    id: "duration",
    header: (info) => <DefaultHeader info={info} name="Duration" />,
    cell: (info) => {
      const duration = info.getValue();

      return typeof duration === "number" ? (
        <span className="text-sm font-medium">
          {CraftingDurationFormat(duration)}
        </span>
      ) : (
        <span className="text-gray-400 italic">N/A</span>
      );
    },
  }),
  columnHelperCrafting.accessor((row) => row.requiredItems ?? "", {
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
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative">
                  {item.gridImageLink && (
                    <Image
                      src={item.gridImageLink}
                      alt={item.name}
                      width={50}
                      height={50}
                      loading="lazy"
                      className="aspect-square object-contain"
                    />
                  )}
                  {amount !== undefined && (
                    <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                      {amount}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col">
                  <Link href={`/item/${item.id}`}>
                    <span className="text-sm  hover:text-chart-2 ">
                      {item.name}
                    </span>
                  </Link>
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
    header: (info) => <DefaultHeader info={info} name="Crafting Cost" />,
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
] as ColumnDef<CraftingProperties>[];

//Columns /weapon
const columnHelperWeapon = createColumnHelper<WeaponItem>();
export const columnsWeapon = [
  columnHelperWeapon.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const icon = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-3">
          <Link href={`/item/${row.id}`}>
            <Image
              src={icon}
              alt={row.name}
              width={100}
              height={100}
              loading="lazy"
              className="aspect-square object-contain h-25"
            />
          </Link>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelperWeapon.accessor("name", {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const row = info.row.original;
      const caliberRaw = info.getValue<string>();
      return (
        <div className="flex flex-row gap-8">
          <Link href={`/item/${row.id}`}>
            <span className="hover:text-chart-2 truncate max-w-[20rem] block">
              {caliberRaw}
            </span>
          </Link>
        </div>
      );
    },
    filterFn: "includesString",
  }),
  columnHelperWeapon.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),
  columnHelperWeapon.accessor(
    (row) => {
      return row.properties.baseItem?.properties?.caliber ?? null;
    },
    {
      id: "caliber",
      header: (info) => <DefaultHeader info={info} name="Caliber" />,
      cell: (info) => {
        const caliberRaw = info.getValue<string | null>();
        if (!caliberRaw)
          return <span className="text-gray-400 italic">N/A</span>;

        const caliberStripped = caliberRaw.replace(/^Caliber\s*/, "");
        const caliberFormatted = caliberStripped.replace(
          /^(\d)(\d{2}x\d+)/,
          "$1.$2"
        );

        return <span>{caliberFormatted}</span>;
      },
    }
  ),

  columnHelperWeapon.accessor(
    (row) => row.properties.baseItem?.properties?.fireRate ?? null,
    {
      id: "fireRate",
      filterFn: UniversalNumberFormatFn,
      header: (info) => <DefaultHeader info={info} name="Fire Rate (RPM)" />,
      cell: (info) => {
        const value = info.getValue<number | null>();
        return value !== null ? (
          <span>{value}</span>
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        );
      },
    }
  ),
  columnHelperWeapon.accessor("properties.recoilVertical", {
    id: "recoilVertical",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Vertical Recoil" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperWeapon.accessor("properties.recoilHorizontal", {
    id: "recoilHorizontal",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Horizontal Recoil" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperWeapon.accessor("properties.ergonomics", {
    id: "ergonomics",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Ergonomics" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperWeapon.accessor(
    (row) => row.properties.baseItem?.properties?.effectiveDistance ?? null,
    {
      filterFn: UniversalNumberFormatFn,
      id: "effectiveDistance",
      header: (info) => <DefaultHeader info={info} name="Effective distance" />,
      cell: (info) => {
        const value = info.getValue<number | null>();
        return value !== null ? (
          <span>{value}m</span>
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        );
      },
    }
  ),
] as ColumnDef<WeaponItem>[];

//Columns /backpacks
const columnHelperBackpacks = createColumnHelper<BackpackItem>();
export const columnsBackpacks = [
  columnHelperBackpacks.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={72}
              height={72}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperBackpacks.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2 w-fit">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm hover:text-chart-2 text-sm truncate max-w-[20rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperBackpacks.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),

  columnHelperBackpacks.accessor("properties.grids", {
    header: (info) => <DefaultHeader info={info} name="Grid" />,
    cell: (info) => {
      const grids = info.getValue();
      if (!grids || grids.length === 0) return "–";

      const first = grids[0];
      return `${first.width} × ${first.height}`;
    },
  }),
  columnHelperBackpacks.accessor("properties.capacity", {
    id: "capacity",
    header: (info) => <DefaultHeader info={info} name="Capacity" />,
    cell: (info) => info.getValue(),
    filterFn: UniversalNumberFormatFn,
  }),
  columnHelperBackpacks.accessor("properties.ergoPenalty", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const initialValue = info.getValue<number>();
      const percent = Math.round(initialValue * 100);

      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperBackpacks.accessor("properties.speedPenalty", {
    id: "speedPenalty",
    header: (info) => <DefaultHeader info={info} name="MoveSpeedPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();
      const percent = Math.round(value * 100);

      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperBackpacks.accessor("properties.turnPenalty", {
    header: (info) => <DefaultHeader info={info} name="TurnPen" />,
    id: "turnPenalty",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();
      const percent = Math.round(value * 100);

      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperBackpacks.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price" />,
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
  columnHelperBackpacks.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  columnHelperBackpacks.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <a
          className="text-muted-foreground hover:text-foreground underline text-sm "
          href={wikiLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Wiki
        </a>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<BackpackItem>[];

//Columns /bodyArmors
const columnHelperArmors = createColumnHelper<ArmorsItem>();
export const columnsArmors = [
  columnHelperArmors.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={100}
              height={100}
              loading="lazy"
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperArmors.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm hover:text-chart-2">{name}</span>
          </Link>
        </div>
      );
    },
  }),

  columnHelperArmors.accessor("properties.class", {
    header: (info) => <DefaultHeader info={info} name="Armor Class" />,
    id: "class",
    filterFn: UniversalStringFilterFn,
    cell: (info) => {
      const armor = info.getValue();
      return armor > 0 ? (
        <>
          <span>{armor}</span>
        </>
      ) : (
        <span className="italic text-gray-400 text-sm">
          No armor plates at default.
        </span>
      );
    },
  }),
  columnHelperArmors.accessor("properties.durability", {
    header: (info) => <DefaultHeader info={info} name="Durability" />,
    id: "durability",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const durability = info.getValue();
      return durability ? (
        <span>{durability}</span>
      ) : (
        <span className="text-muted-foreground text-sm italic">N/A</span>
      );
    },
  }),
  columnHelperArmors.accessor("properties.ergoPenalty", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperArmors.accessor("properties.speedPenalty", {
    id: "speedPenalty",
    header: (info) => <DefaultHeader info={info} name="MoveSpeedPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),

  columnHelperArmors.accessor("properties.turnPenalty", {
    header: (info) => <DefaultHeader info={info} name="TurnPen" />,
    id: "turnPenalty",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperArmors.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Base Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  columnHelperArmors.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <a
          className="text-muted-foreground hover:text-foreground underline text-sm flex items-center "
          href={wikiLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Wiki
        </a>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ArmorsItem>[];

//Columns /chest-rigs
const columnHelperChestRigs = createColumnHelper<ArmorsItem>();
export const columnsChestRigs = [
  columnHelperChestRigs.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={100}
              height={100}
              loading="lazy"
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperChestRigs.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm hover:text-chart-2">{name}</span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperChestRigs.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),

  columnHelperChestRigs.accessor("properties.ergoPenalty", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperChestRigs.accessor("properties.speedPenalty", {
    id: "speedPenalty",
    header: (info) => <DefaultHeader info={info} name="MoveSpeedPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),

  columnHelperChestRigs.accessor("properties.turnPenalty", {
    header: (info) => <DefaultHeader info={info} name="TurnPen" />,
    id: "turnPenalty",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperChestRigs.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Base Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  columnHelperChestRigs.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="WikiLink" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <a
          className="text-muted-foreground hover:text-foreground underline text-sm flex items-center "
          href={wikiLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Wiki
        </a>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ArmorsItem>[];

//Columns /armor-plates
const columnHelperArmorPlates = createColumnHelper<ArmorsItem>();
export const columnsArmorPlates = [
  columnHelperArmorPlates.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              loading="lazy"
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperArmorPlates.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperArmorPlates.accessor("properties.class", {
    header: (info) => <DefaultHeader info={info} name="Armor Class" />,
    id: "class",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const armor = info.getValue();
      return armor > 0 ? (
        <>
          <div className="w-20">
            <span>{armor}</span>
          </div>
        </>
      ) : (
        <span className="italic text-gray-400 text-sm">
          No armor plates at default.
        </span>
      );
    },
  }),
  columnHelperArmorPlates.accessor("properties.material.name", {
    header: (info) => <DefaultHeader info={info} name="Material" />,
    id: "material",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const name = info.getValue();
      return (
        <div className="flex grow max-w-40 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm truncate cursor-pointer max-w-[300px] block">
                {name}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  }),
  columnHelperArmorPlates.accessor("properties.durability", {
    header: (info) => <DefaultHeader info={info} name="Durability" />,
    id: "durability",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const durability = info.getValue();
      return durability ? (
        <div className="w-20">
          <span>{durability}</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-sm italic">N/A</span>
      );
    },
  }),
  columnHelperArmorPlates.accessor("properties.ergoPenalty", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      const percent = Math.round(initialValue * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperArmorPlates.accessor("properties.speedPenalty", {
    id: "speedPenalty",
    header: (info) => <DefaultHeader info={info} name="SpeedPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),

  columnHelperArmorPlates.accessor("properties.turnPenalty", {
    header: (info) => <DefaultHeader info={info} name="TurnPen" />,
    id: "turnPenalty",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperArmorPlates.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Base Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <div className="w-20">
            <span>{info.getValue()}kg</span>
          </div>
        </>
      );
    },
  }),
  columnHelperArmorPlates.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-muted-foreground hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ArmorsItem>[];

//Columns /face-covers
const columnHelperFaceCovers = createColumnHelper<ArmorsItem>();
export const columnsFaceCovers = [
  columnHelperArmors.accessor(
    (row) => row.properties?.__typename ?? "Unknown",
    {
      id: "__typename",
      enableColumnFilter: false,
      enableHiding: false,
      header: (info) => <DefaultHeader info={info} name="Type" />,
      filterFn: (row, id, filterValue) => {
        if (!filterValue || filterValue === "All") return true;

        const rawType = row.original.properties?.__typename;

        switch (filterValue) {
          case "Armored Face Covers":
            return rawType === "ItemPropertiesHelmet";
          default:
            return true;
        }
      },
      cell: (info) => {
        const rawType = info.getValue();
        const readable =
          rawType === "ItemPropertiesHelmet" ? "ArmoredFC" : "Other";
        return <span>{readable}</span>;
      },
    }
  ),
  columnHelperFaceCovers.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain h-25"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperFaceCovers.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[15rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),

  columnHelperFaceCovers.accessor((row) => row.properties?.class ?? "", {
    header: (info) => <DefaultHeader info={info} name="Armor Class" />,
    id: "class",

    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const armor = info.getValue();

      return armor > 0 ? (
        <>
          <div className="w-20 text-center">
            <span>{armor}</span>
          </div>
        </>
      ) : (
        <span className="italic text-muted-foreground text-sm">N/A</span>
      );
    },
  }),
  columnHelperFaceCovers.accessor(
    (row) => row.properties?.material.name ?? "",
    {
      header: (info) => <DefaultHeader info={info} name="Material" />,
      id: "material",
      filterFn: (row, columnId, filterValue) =>
        String(row.getValue(columnId)) === filterValue,
      cell: (info) => {
        const name: string = info.getValue();
        return name ? (
          <div className="flex grow max-w-40 ">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm truncate cursor-pointer max-w-[300px] block">
                  {name}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <span className="italic text-gray-400 text-sm">N/A</span>
        );
      },
    }
  ),
  columnHelperFaceCovers.accessor((row) => row.properties?.ricochetY ?? null, {
    id: "ricochet",
    header: (info) => <DefaultHeader info={info} name="Ricochet Chance" />,
    filterFn: ricochetFilterFn,
    cell: (info) => {
      const ricochet: number | null = info.getValue();

      if (ricochet == null)
        return (
          <span className="italic text-muted-foreground text-sm">N/A</span>
        );

      return (
        <div className="">
          <span>{RicochetChanceFormat(ricochet)}</span>
        </div>
      );
    },
  }),
  columnHelperFaceCovers.accessor("properties.durability", {
    header: (info) => <DefaultHeader info={info} name="Durability" />,
    id: "durability",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const durability = info.getValue();
      return durability ? (
        <div className="w-20">
          <span>{durability}</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-sm italic">N/A</span>
      );
    },
  }),

  columnHelperFaceCovers.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Base Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <div className="w-20">
            <span>{info.getValue()}kg</span>
          </div>
        </>
      );
    },
  }),

  columnHelperFaceCovers.accessor("properties.ergoPenalty", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      const percent = Math.round(initialValue * 100);

      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperFaceCovers.accessor("properties.speedPenalty", {
    id: "speedPenalty",
    header: (info) => <DefaultHeader info={info} name="SpeedPen" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),

  columnHelperFaceCovers.accessor("properties.turnPenalty", {
    header: (info) => <DefaultHeader info={info} name="TurnPen" />,
    id: "turnPenalty",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperFaceCovers.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price" />,
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
  columnHelperFaceCovers.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="WikiLink" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-muted-foreground hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ArmorsItem>[];

//Columns /Keys
const columnHelperKeys = createColumnHelper<KeyItem>();
export const columnsKeys = [
  columnHelperKeys.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={50}
              height={50}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperKeys.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperKeys.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),

  columnHelperKeys.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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

  columnHelperFaceCovers.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/80 hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<KeyItem>[];

//Columns /medical |  MedicalItems
const columnHelperMedicalItems =
  createColumnHelper<ItemPropertiesMedicalItem>();
export const columnsMedicalItems = [
  columnHelperMedicalItems.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={50}
              height={50}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperMedicalItems.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperMedicalItems.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),

  columnHelperMedicalItems.accessor("properties.uses", {
    id: "uses",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Uses" />,
    cell: (info) => {
      const uses = info.getValue();

      return uses ? (
        <div>
          <span>{uses}</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedicalItems.accessor("properties.useTime", {
    id: "useTime",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Use Time" />,
    cell: (info) => {
      const useTime = info.getValue();

      return useTime ? (
        <div>
          <span>{useTime} sec</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedicalItems.accessor("properties.cures", {
    id: "cures",
    filterFn: (row, _columnId, filterValue) => {
      const cures = row.original.properties?.cures ?? [];
      return cures.includes(filterValue);
    },
    header: (info) => <DefaultHeader info={info} name="Cures" />,
    cell: (info) => {
      const cures: string[] = info.getValue();

      return (
        <div>
          {cures.map((cure, index) => (
            <span key={index}>
              {camelCaseToTitleFormat(cure)}
              {index < cures.length - 1 && ", "}
            </span>
          ))}
        </div>
      );
    },
  }),

  columnHelperMedicalItems.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/80 hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesMedicalItem>[];

//Columns /medical |  Medkits
const columnHelperMedkits = createColumnHelper<ItemPropertiesMedKit>();
export const columnsMedkits = [
  columnHelperMedkits.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={50}
              height={50}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperMedkits.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperMedkits.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),

  columnHelperMedkits.accessor("properties.hitpoints", {
    id: "hitpoints",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="HP" />,
    cell: (info) => {
      const hitpoints = info.getValue();

      return hitpoints ? (
        <div>
          <span>{hitpoints}</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedkits.accessor("properties.useTime", {
    id: "useTime",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Use Time" />,
    cell: (info) => {
      const useTime = info.getValue();

      return useTime ? (
        <div>
          <span>{useTime} sec</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedkits.accessor("properties.cures", {
    id: "cures",
    filterFn: (row, _columnId, filterValue) => {
      const cures = row.original.properties?.cures ?? [];
      return cures.includes(filterValue);
    },
    header: (info) => <DefaultHeader info={info} name="Cures" />,
    cell: (info) => {
      const cures: string[] = info.getValue();

      return cures ? (
        <div>
          {cures.map((cure) => (
            <span key={cure} className="truncate max-w-[15rem] block text-sm">
              {camelCaseToTitleFormat(cure)}
            </span>
          ))}
        </div>
      ) : (
        <div>
          <span className="italic text-muted-foreground">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedkits.accessor("properties.maxHealPerUse", {
    id: "maxHealPerUse",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Max Heal" />,
    cell: (info) => {
      const cost = info.getValue();

      return cost ? (
        <div>
          <span>{cost}</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedkits.accessor("properties.hpCostLightBleeding", {
    id: "hpCostLightBleeding",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Light Bleed" />,
    cell: (info) => {
      const cost = info.getValue();

      return cost ? (
        <div>
          <span>{cost}</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),
  columnHelperMedkits.accessor("properties.hpCostHeavyBleeding", {
    id: "hpCostHeavyBleeding",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Heavy Bleed" />,
    cell: (info) => {
      const cost = info.getValue();

      return cost ? (
        <div>
          <span>{cost}</span>
        </div>
      ) : (
        <div>
          <span className="italic text-foreground-muted">N/A</span>
        </div>
      );
    },
  }),

  columnHelperMedkits.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/80 hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesMedKit>[];

//Columns /provisions |  Food&Drink
const columnHelperProvisions = createColumnHelper<ItemPropertiesFoodDrink>();
export const columnsProvisions = [
  columnHelperProvisions.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={50}
              height={50}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperProvisions.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2 w-fit max-w-[15rem]">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm hover:text-chart-2 truncate block w-[15rem]">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperProvisions.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),

  columnHelperProvisions.accessor("properties.energy", {
    id: "energy",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Energy" />,
    cell: (info) => {
      const hydration: number = info.getValue();

      const className =
        hydration < 0
          ? "text-chart-3"
          : hydration > 0
          ? "text-chart-2"
          : "inherit";

      const formattedValue = hydration > 0 ? `+${hydration}` : `${hydration}`;

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{formattedValue}</span>
        </div>
      );
    },
  }),

  columnHelperProvisions.accessor("properties.hydration", {
    id: "hydration",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Hydration" />,
    cell: (info) => {
      const hydration: number = info.getValue();

      const className =
        hydration < 0
          ? "text-chart-3"
          : hydration > 0
          ? "text-chart-2"
          : "inherit";

      const formattedValue = hydration > 0 ? `+${hydration}` : `${hydration}`;

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{formattedValue}</span>
        </div>
      );
    },
  }),

  columnHelperProvisions.accessor("properties.units", {
    id: "units",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Units" />,
    cell: (info) => {
      const units: number = info.getValue();

      return units ? (
        <div>
          <span>{units}</span>
        </div>
      ) : (
        <div>
          <span>0</span>
        </div>
      );
    },
  }),
  columnHelperProvisions.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/80 hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesFoodDrink>[];

//Columns /weapon-mods/scopes Scopes
const columnHelperScopes = createColumnHelper<ScopeItem>();
export const columnsScopes = [
  columnHelperScopes.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperScopes.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperScopes.accessor("properties.ergonomics", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="Ergo" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }
      const style = {
        color:
          initialValue < 0 ? "red" : initialValue > 0 ? "green" : "inherit",
        fontWeight: 500,
      };

      return (
        <div className="max-w-20">
          <span style={style}>{initialValue}</span>
        </div>
      );
    },
  }),
  columnHelperScopes.accessor((row) => row.properties?.sightModes, {
    id: "sightModes",
    header: (info) => <DefaultHeader info={info} name="Sight Modes" />,
    cell: (info) => {
      const sightModes = info.getValue() as number[] | undefined;

      const display =
        sightModes && sightModes.length > 0
          ? Array.from(new Set(sightModes)).join(", ")
          : "N/A";

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm hover:text-chart-2 ">{display}</span>
        </div>
      );
    },
  }),
  columnHelperScopes.accessor((row) => row.properties?.zoomLevels, {
    id: "zoomLevels",
    header: (info) => <DefaultHeader info={info} name="Zoom Levels" />,
    cell: (info) => {
      const zoomLevels = info.getValue() as number[][] | undefined;

      const display =
        zoomLevels && zoomLevels.length > 0
          ? zoomLevels
              .map(([min, max]) => (min === max ? `${min}x` : `${min}–${max}x`))
              .join(", ")
          : "N/A";

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm hover:text-chart-2">{display}</span>
        </div>
      );
    },
  }),
  columnHelperScopes.accessor((row) => row.properties?.sightingRange, {
    id: "sightingRange",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Sight Modes" />,
    cell: (info) => {
      const sightingRange = info.getValue() as number | undefined;

      return sightingRange ? (
        <div className="flex items-center gap-2">
          <span className="text-sm hover:text-chart-2 ">{sightingRange}m</span>
        </div>
      ) : (
        <span className="italic font-gray-600">N/A</span>
      );
    },
  }),
  columnHelperScopes.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <div className="w-20">
            <span>{info.getValue()}kg</span>
          </div>
        </>
      );
    },
  }),
  columnHelperScopes.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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

  columnHelperScopes.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-chart-2 hover:text-gray-700 underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ScopeItem>[];

//Columns /helmets
const columnHelperHelmets = createColumnHelper<ArmorsItem>();
export const columnsHelmets = [
  columnHelperHelmets.accessor(
    (row) => row.properties?.__typename ?? "Unknown",
    {
      id: "__typename",
      enableColumnFilter: false,
      enableHiding: false,
      header: (info) => <DefaultHeader info={info} name="Type" />,
      filterFn: (row, id, filterValue) => {
        if (!filterValue || filterValue === "All") return true;

        const rawType = row.original.properties?.__typename;

        switch (filterValue) {
          case "Armored Face Covers":
            return rawType === "ItemPropertiesHelmet";
          default:
            return true;
        }
      },
      cell: (info) => {
        const rawType = info.getValue();
        const readable =
          rawType === "ItemPropertiesHelmet" ? "ArmoredFC" : "Other";
        return <span>{readable}</span>;
      },
    }
  ),
  columnHelperHelmets.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain h-25"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperHelmets.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperHelmets.accessor((row) => row.properties?.class ?? "", {
    header: (info) => <DefaultHeader info={info} name="Armor Class" />,
    id: "class",

    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const armor = info.getValue();

      return armor > 0 ? (
        <>
          <div className="w-20">
            <span>{armor}</span>
          </div>
        </>
      ) : (
        <span className="italic text-gray-400 text-sm">N/A</span>
      );
    },
  }),
  columnHelperHelmets.accessor((row) => row.properties?.material.name ?? "", {
    header: (info) => <DefaultHeader info={info} name="Material" />,
    id: "material",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const name: string = info.getValue();
      return name ? (
        <div className="flex grow max-w-30 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm truncate cursor-pointer  block">
                {name}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <span className="italic text-gray-400 text-sm">N/A</span>
      );
    },
  }),
  columnHelperHelmets.accessor((row) => row.properties?.ricochetY ?? null, {
    id: "ricochet",
    header: (info) => <DefaultHeader info={info} name="Ricochet Chance" />,
    filterFn: ricochetFilterFn,
    cell: (info) => {
      const ricochet: number | null = info.getValue();

      if (ricochet == null)
        return <span className="italic text-gray-400 text-sm">N/A</span>;

      return (
        <div className="flex items-center gap-2">
          <span>{RicochetChanceFormat(ricochet)}</span>
        </div>
      );
    },
  }),
  columnHelperHelmets.accessor("properties.durability", {
    header: (info) => <DefaultHeader info={info} name="Durability" />,
    id: "durability",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const durability = info.getValue();
      return durability ? (
        <div className="w-20">
          <span>{durability}</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-sm italic">N/A</span>
      );
    },
  }),
  columnHelperHelmets.accessor("properties.blocksHeadset", {
    header: (info) => <DefaultHeader info={info} name="Headset?" />,
    id: "blocksHeadset",
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as boolean;
      const label = value ? "Blocks" : "Allows";
      return label === filterValue;
    },
    cell: (info) => {
      const blocksHeadset = info.getValue();

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-8 flex justify-center cursor-default text-chart-3">
              {blocksHeadset ? (
                <X size={20} />
              ) : (
                <Check size={20} className="text-chart-2" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-sm ">
            {blocksHeadset ? "Blocks Headset" : "Allows Headset"}
          </TooltipContent>
        </Tooltip>
      );
    },
  }),

  columnHelperHelmets.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      return (
        <>
          <div className="w-20">
            <span>{info.getValue()}kg</span>
          </div>
        </>
      );
    },
  }),

  columnHelperHelmets.accessor("properties.ergoPenalty", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="ErgoPen" />,
    filterFn: universalPenaltyFilter,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      const percent = Math.round(initialValue * 100);

      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperHelmets.accessor("properties.speedPenalty", {
    id: "speedPenalty",
    header: (info) => <DefaultHeader info={info} name="SpeedPen" />,
    filterFn: universalPenaltyFilter,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);

      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),

  columnHelperHelmets.accessor("properties.turnPenalty", {
    header: (info) => <DefaultHeader info={info} name="TurnPen" />,
    id: "turnPenalty",
    filterFn: universalPenaltyFilter,
    cell: (info) => {
      const value = info.getValue<number>();

      if (!Number.isFinite(value)) {
        return (
          <span className="italic text-sm text-muted-foreground">N/A</span>
        );
      }

      const percent = Math.round(value * 100);
      const className =
        percent < 0 ? "text-chart-3" : percent > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{percent}%</span>
        </div>
      );
    },
  }),
  columnHelperHelmets.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/80 hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  }),
] as ColumnDef<ArmorsItem>[];

//Columns /grenades
const columnHelperGrenades = createColumnHelper<GrenadeItem>();
export const columnsGrenades = [
  columnHelperGrenades.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain h-25"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperGrenades.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperGrenades.accessor((row) => row.properties?.type ?? "", {
    header: (info) => <DefaultHeader info={info} name="Type" />,
    id: "type",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const type = info.getValue();

      return (
        <>
          <div className="w-20">
            <span>{type}</span>
          </div>
        </>
      );
    },
  }),
  columnHelperGrenades.accessor((row) => row.properties?.fuse ?? "", {
    header: (info) => <DefaultHeader info={info} name="Fuse" />,
    id: "fuse",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const fuse: number = info.getValue();
      return (
        <>
          <div className="w-20  ">
            <span>{fuse} sec</span>
          </div>
        </>
      );
    },
    enableColumnFilter: true,
  }),
  columnHelperGrenades.accessor((row) => row.properties?.fragments ?? "", {
    header: (info) => <DefaultHeader info={info} name="Fragments" />,
    id: "fragments",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const fragments: number = info.getValue();
      return (
        <>
          <div className="w-20">
            <span>{fragments}</span>
          </div>
        </>
      );
    },
  }),
  columnHelperGrenades.accessor(
    (row) => row.properties.maxExplosionDistance ?? "",
    {
      header: (info) => <DefaultHeader info={info} name="Max Distance" />,
      id: "maxExplosion",
      filterFn: UniversalNumberFormatFn,
      cell: (info) => {
        const maxExplosion: number = info.getValue();

        return (
          <>
            <div className="w-20">
              <span>{maxExplosion}m</span>
            </div>
          </>
        );
      },
    }
  ),
  columnHelperGrenades.accessor((row) => row.weight ?? "", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const weight = info.getValue();

      return (
        <>
          <div className="w-20">
            <span>{weight}kg</span>
          </div>
        </>
      );
    },
  }),
  columnHelperGrenades.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-muted-foreground hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<GrenadeItem>[];

//Columns /headsets
const columnHelperHeadsets = createColumnHelper<HeadsetItem>();
export const columnsHeadsets = [
  columnHelperHeadsets.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain h-25"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperHeadsets.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperHeadsets.accessor((row) => row.properties?.ambientVolume ?? "", {
    header: (info) => <DefaultHeader info={info} name="Ambient Noise" />,
    id: "ambientVolume",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const ambientVolume = info.getValue();

      return (
        <>
          <div className="w-20">
            <span>{ambientVolume}</span>
          </div>
        </>
      );
    },
  }),
  columnHelperHeadsets.accessor(
    (row) => row.properties?.distanceModifier ?? "",
    {
      header: (info) => <DefaultHeader info={info} name="Distance Modifier" />,
      id: "distanceModifier",
      filterFn: UniversalNumberFormatFn,
      cell: (info) => {
        const distanceModifier = info.getValue();

        return (
          <>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-chart-2">
                  {HeadsetsDistanceFormat(distanceModifier)}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-sm">
                Increases the maximum range from which you can hear sounds in
                the game.
                <br />
                <span className="text-muted-foreground">
                  For example, +7% means you can hear footsteps about 7% farther
                  than normal.
                </span>
              </TooltipContent>
            </Tooltip>
          </>
        );
      },
    }
  ),
  columnHelperHeadsets.accessor((row) => row.properties?.distortion ?? "", {
    header: (info) => <DefaultHeader info={info} name="Distortion" />,
    id: "distortion",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const distortion = info.getValue();

      return (
        <>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-chart-3">
                {HeadsetsDistortionFormat(distortion)}
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-sm">
              Indicates how much the audio is distorted by the headset. Lower
              values mean cleaner, clearer sound.
              <br />
              <span className="text-muted-foreground">
                A distortion of 15% means slight audio distortion, but the sound
                remains quite clear.
              </span>
            </TooltipContent>
          </Tooltip>
        </>
      );
    },
  }),
  columnHelperHeadsets.accessor((row) => row.weight ?? "", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const weight = info.getValue();

      return (
        <>
          <div className="w-20">
            <span>{weight}kg</span>
          </div>
        </>
      );
    },
  }),
  columnHelperHeadsets.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-muted-foreground hover:text-foreground underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<HeadsetItem>[];

//Columns Task, /item/[id]
const columnHelperTask = createColumnHelper<Task>();
export const columnsTaskSimple = [
  columnHelperTask.accessor((row) => row.trader, {
    id: "trader",
    header: (info) => <DefaultHeader info={info} name="Trader" />,
    cell: (info) => {
      const trader = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2 flex-wrap max-w-full">
          <Image
            aria-label={`Image of trader: ${trader.name}`}
            src={row.trader.imageLink}
            alt={`${trader.name}`}
            width={50}
            height={50}
            loading="lazy"
            className="aspect-square object-contain"
          />
          {trader.name}
        </div>
      );
    },
  }),
  columnHelperTask.accessor((row) => ({ id: row.id, name: row.name }), {
    id: "name",
    filterFn: "includesString",
    header: (info) => <DefaultHeader info={info} name="Task" />,
    cell: (info) => {
      const task = info.getValue();

      return (
        <div className="flex items-center gap-2 flex-wrap max-w-full">
          <Link href={`/task/${task.id}`}>
            <span className="text-sm font-medium break-words whitespace-normal text-chart-2 hover:text-foreground/80">
              {task.name}
            </span>
          </Link>
        </div>
      );
    },
  }),

  columnHelperTask.accessor(
    (row) => ({
      kappa: row.kappaRequired,
      lightkeeper: row.lightkeeperRequired,
    }),
    {
      id: "requirements",
      header: (info) => <DefaultHeader info={info} name="Required for" />,
      cell: (info) => {
        const { kappa, lightkeeper } = info.getValue();
        const hasAny = kappa || lightkeeper;

        return hasAny ? (
          <div className="flex  gap-2">
            {kappa && (
              <Tooltip>
                <TooltipTrigger>
                  <Briefcase
                    className="w-5 h-5 object-contain"
                    aria-label="Icon of kappa container"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Required for Kappa</p>
                </TooltipContent>
              </Tooltip>
            )}
            {lightkeeper && (
              <Tooltip>
                <TooltipTrigger>
                  <TowerControl
                    className="w-5 h-5 object-contain"
                    aria-label="Icon of lighthouse"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Required for Lightkeeper</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ) : (
          <div className="flex">
            <span className="text-gray-400 italic ">Not Required</span>
          </div>
        );
      },
    }
  ),
] as ColumnDef<Task>[];

//Columns Tasks,
const columnHelper = createColumnHelper<Task>();
export const columnsTaskAdvanced = [
  columnHelper.accessor((row) => row.trader.name, {
    id: "trader",
    filterFn: "equals",
    header: (info) => <DefaultHeader info={info} name="Trader" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2 flex-wrap max-w-full">
          <Image
            aria-label={`Image of trader: ${name}`}
            src={row.trader.imageLink}
            alt={name}
            width={75}
            height={75}
            className="object-contain h-25"
          />
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    filterFn: "includesString",
    header: (info) => <DefaultHeader info={info} name="Task" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;
      const taskId = row.id;

      return (
        <div className="flex items-center gap-2 flex-wrap max-w-full">
          <Link href={`/task/${taskId}`}>
            <span className="text-sm font-medium break-words whitespace-normal  hover:text-chart-2  ">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.taskRequirements, {
    id: "taskRequirements",
    header: (info) => <DefaultHeader info={info} name="Required Tasks" />,
    cell: (info) => {
      const requirements = info.getValue();
      return requirements && requirements.length > 0 ? (
        <div className="flex flex-col gap-1 justify-center">
          {requirements.map((req) => (
            <span
              key={req.task.id}
              className="text-sm text-chart-2 hover:text-foreground/80"
            >
              <Link href={`/task/${req.task.id}`}>{req.task.name}</Link>
            </span>
          ))}
        </div>
      ) : (
        <span className="text-gray-400 italic">None</span>
      );
    },
  }),
  columnHelper.accessor("minPlayerLevel", {
    id: "minPlayerLevel",
    header: (info) => <DefaultHeader info={info} name="Min. Level" />,
    cell: (info) => info.getValue(),
    filterFn: UniversalNumberFormatFn,
  }),
  columnHelper.accessor((row) => row.map?.name ?? "", {
    id: "map.name",
    filterFn: "includesString",
    header: (info) => <DefaultHeader info={info} name="Map" />,
    cell: (info) => {
      const mapName = info.getValue();
      return mapName ? (
        <span className="text-sm">{mapName}</span>
      ) : (
        <span className="text-gray-400 italic">Any</span>
      );
    },
  }),
  {
    id: "requirements",
    header: (info) => <DefaultHeader info={info} name="Required For" />,
    filterFn: (row, id, filterValue) => {
      if (!filterValue || filterValue === "All") return true;

      const { kappaRequired, lightkeeperRequired } = row.original;

      switch (filterValue) {
        case "Both":
          return kappaRequired === true && lightkeeperRequired === true;
        case "Kappa":
          return kappaRequired === true;
        case "Lightkeeper":
          return lightkeeperRequired === true;
        case "None":
          return kappaRequired === false && lightkeeperRequired === false;
        default:
          return true;
      }
    },
    cell: (info) => {
      const { kappaRequired, lightkeeperRequired } = info.row.original;
      const hasAny = kappaRequired || lightkeeperRequired;

      return hasAny ? (
        <div className="flex items-center gap-2 justify-center">
          {kappaRequired && (
            <Tooltip>
              <TooltipTrigger>
                <Briefcase className="w-5 h-5" aria-label="Kappa icon" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Required for Kappa</p>
              </TooltipContent>
            </Tooltip>
          )}
          {lightkeeperRequired && (
            <Tooltip>
              <TooltipTrigger>
                <TowerControl
                  className="w-5 h-5"
                  aria-label="Lighthouse icon"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Required for Lightkeeper</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <span className="text-gray-400 italic">Not Required</span>
        </div>
      );
    },
  },
] as ColumnDef<Task>[];

//Columns Flea Market
const columnHelperFlea = createColumnHelper<BaseItem>();
export const columnsFlea = [
  columnHelperFlea.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const icon = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-3 ">
          <Link href={`/item/${row.id}`}>
            <Image
              src={icon}
              alt={row.name}
              aria-label={`Image of item: ${row.name}`}
              width={50}
              height={50}
              priority
              className="object-contain h-25"
            />
          </Link>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelperFlea.accessor((row) => row.name, {
    id: "name",
    filterFn: "includesString",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center  gap-3">
            <span className="text-sm font-medium hover:text-chart-2">
              {name}
            </span>
          </div>
        </Link>
      );
    },
  }),
  columnHelperFlea.accessor((row) => row.category?.parent?.name ?? "", {
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
  columnHelperFlea.accessor("avg24hPrice", {
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

  columnHelperFlea.accessor("low24hPrice", {
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

  columnHelperFlea.accessor("high24hPrice", {
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
  columnHelperFlea.accessor("wikiLink", {
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();
      return wikiLink ? (
        <div className="">
          <a
            className="text-muted-foreground hover:text-foreground underline text-sm flex items-center "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      ) : (
        <span className="text-muted-foreground italic">N/A</span>
      );
    },
  }),
] as ColumnDef<BaseItem>[];

//Columns Ammo
const columnHelperAmmo = createColumnHelper<Ammo>();
export const columnsAmmo = [
  columnHelperAmmo.accessor("item.iconLink", {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const caliberRaw = info.getValue<string>();
      return (
        <Link href={`/item/${info.row.original.item.id}`}>
          <Image
            aria-label={`Icon of ${caliberRaw}`}
            src={`${info.row.original.item.iconLink}`}
            alt={`Icon of ${caliberRaw}`}
            width={50}
            height={50}
          />
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperAmmo.accessor("item.name", {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const fullName = info.getValue<string>();
      if (!fullName) return null;

      const nameParts = fullName.split(" ");
      const bulletName = nameParts.slice(1).join(" ");

      return (
        <div className="  ">
          <Link href={`/item/${info.row.original.item.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[15rem] block">
              {bulletName}
            </span>
          </Link>
        </div>
      );
    },
    filterFn: "includesString",
  }),
  columnHelperAmmo.accessor("caliber", {
    id: "caliber",
    header: (info) => <DefaultHeader info={info} name="Caliber" />,
    cell: (info) => {
      const caliberRaw = info.getValue<string>();

      return (
        <div className={`flex flex-row items-center gap-2`}>
          <Link href={`/item/${info.row.original.item.id}`}>
            <span className="hover:text-chart-2 text-foreground">
              {CaliberFormat(caliberRaw)}
            </span>
          </Link>
        </div>
      );
    },
    filterFn: "equals",
  }),

  columnHelperAmmo.accessor("penetrationPower", {
    header: (info) => <DefaultHeader info={info} name="Pen" />,
    cell: (info) => info.getValue(),
    filterFn: UniversalNumberFormatFn,
  }),

  columnHelperAmmo.accessor("damage", {
    header: (info) => <DefaultHeader info={info} name="Dmg" />,
    cell: (info) => info.getValue(),
    filterFn: UniversalNumberFormatFn,
  }),

  columnHelperAmmo.accessor("armorDamage", {
    header: (info) => <DefaultHeader info={info} name="ArmDmg" />,
    cell: (info) => info.getValue(),
    filterFn: UniversalNumberFormatFn,
  }),

  columnHelperAmmo.accessor("accuracyModifier", {
    header: (info) => <DefaultHeader info={info} name="Acc" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const percent = info.getValue();
      const value = Math.round(percent * 100);
      const className =
        value < 0 ? "text-chart-3" : value > 0 ? "text-chart-2" : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{value}%</span>
        </div>
      );
    },
  }),

  columnHelperAmmo.accessor("recoilModifier", {
    header: (info) => <DefaultHeader info={info} name="Recoil" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const percent = info.getValue();
      const value = Math.round(percent * 100);
      const className =
        value < 0 ? "text-chart-2" : value > 0 ? "text-chart-3" : "inherit";

      if (value > 0)
        return (
          <div className="max-w-20">
            <span className={`${className} font-medium`}>+{value}</span>
          </div>
        );
      else
        return (
          <div className="max-w-20">
            <span className={`${className} font-medium`}>{value}</span>
          </div>
        );
    },
  }),

  columnHelperAmmo.accessor("fragmentationChance", {
    header: (info) => <DefaultHeader info={info} name="Frag" />,
    cell: (info) => `${Math.round(info.getValue() * 100)}%`,
    filterFn: UniversalNumberFormatFn,
  }),

  columnHelperAmmo.accessor("initialSpeed", {
    header: (info) => <DefaultHeader info={info} name="Speed m/s" />,
    cell: (info) => info.getValue(),
    filterFn: (row, id, filterValue) => {
      if (!filterValue) return true;

      const cost: number = row.getValue(id);
      const { min, max } = filterValue;

      if (min !== null && cost < min) return false;
      if (max !== null && cost > max) return false;

      return true;
    },
  }),

  columnHelperAmmo.accessor("ricochetChance", {
    header: (info) => <DefaultHeader info={info} name="Ricochet" />,
    cell: (info) => `${Math.round(info.getValue() * 100)}%`,
    filterFn: UniversalNumberFormatFn,
  }),
] as ColumnDef<Ammo>[];

//Columns Container
const columnHelperContainer = createColumnHelper<BaseItem>();
export const columnsContainer = [
  columnHelperContainer.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const icon = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-3">
            <Image
              aria-label={`Icon of ${row.name}`}
              src={`${icon}`}
              alt={`Icon of ${row.name}`}
              width={75}
              height={75}
              className="object-contain h-25"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelperContainer.accessor((row) => row.name, {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center  gap-3">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm font-medium hover:text-chart-2">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperContainer.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),
  columnHelperBackpacks.accessor("properties.grids", {
    header: (info) => <DefaultHeader info={info} name="Grid" />,
    cell: (info) => {
      const grids = info.getValue();
      if (!grids || grids.length === 0) return "–";

      const first = grids[0];
      return `${first.width} × ${first.height}`;
    },
  }),
  columnHelperBackpacks.accessor("properties.capacity", {
    id: "capacity",
    header: (info) => <DefaultHeader info={info} name="Capacity" />,
    cell: (info) => info.getValue(),
    filterFn: UniversalNumberFormatFn,
  }),

  columnHelperContainer.accessor("avg24hPrice", {
    header: (info) => <DefaultHeader info={info} name="Avg Price (24h)" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const value = info.getValue<number | null | undefined>();
      return typeof value === "number" ? (
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Avg</span>
          <span className="text-base font-medium">
            {value.toLocaleString("de-DE")}₽
          </span>
        </div>
      ) : (
        <span className="text-gray-600 italic">N/A</span>
      );
    },
  }),
  columnHelperContainer.accessor(
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
            <span className="text-sm text-gray-600">
              {cheapest.vendor.name}
            </span>
            <span className="text-base font-medium">
              {price.toLocaleString("de-DE")}₽
            </span>
          </div>
        ) : (
          <span className="text-gray-600 italic">N/A</span>
        );
      },
    }
  ),
  columnHelperContainer.accessor("wikiLink", {
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();
      return wikiLink ? (
        <div className="">
          <a
            className="text-foreground/80 hover:text-foreground underline text-sm "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      ) : (
        <span className="text-gray-600 italic">N/A</span>
      );
    },
  }),
] as ColumnDef<BaseItem>[];

//Column Barrels | /weapon-mods/vital parts
const columnHelperBarrels = createColumnHelper<ItemPropertiesWeaponMod>();
export const columnsBarrels = [
  columnHelperBarrels.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperBarrels.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperBarrels.accessor("properties.ergonomics", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="Ergo Modifier" />,
    filterFn: universalPenaltyFilter,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }
      const className =
        initialValue < 0
          ? "text-chart-3"
          : initialValue > 0
          ? "text-chart-2"
          : "inherit";

      return (
        <div className="max-w-20">
          <span className={`${className} font-medium`}>{initialValue}</span>
        </div>
      );
    },
  }),

  columnHelperBarrels.accessor("properties.recoilModifier", {
    id: "recoilModifier",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Recoil Modifier" />,
    cell: (info) => {
      const recoil = info.getValue();
      const formatRecoil = Math.round(recoil * 100);
      const className =
        formatRecoil < 0
          ? "text-chart-2"
          : formatRecoil > 0
          ? "text-chart-2"
          : "inherit";

      return formatRecoil ? (
        <div>
          <span className={`${className} font-medium`}>{formatRecoil}%</span>
        </div>
      ) : (
        <span>0</span>
      );
    },
  }),
  columnHelperScopes.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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
  columnHelperScopes.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/70 hover:text-foreground/80 underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesWeaponMod>[];

//Column Gas Block | /weapon-mods/vital parts
const columnHelperGasBlock = createColumnHelper<ItemPropertiesWeaponMod>();
export const columnsGasBlock = [
  columnHelperGasBlock.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperGasBlock.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperGasBlock.accessor("properties.ergonomics", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="Ergo Modifier" />,
    filterFn: universalPenaltyFilter,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      if (initialValue > 0) {
        return (
          <div className="max-w-20">
            <span className="text-chart-2 font-medium">+{initialValue}</span>
          </div>
        );
      }

      if (initialValue < 0) {
        return <span className="text-chart-3">{initialValue}</span>;
      }

      // 0 – bez stylu
      return <span>{initialValue}</span>;
    },
  }),

  columnHelperGasBlock.accessor("properties.recoilModifier", {
    id: "recoilModifier",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Recoil Modifier" />,
    cell: (info) => {
      const recoil = info.getValue();
      const formatRecoil = Math.round(recoil * 100);
      const className =
        formatRecoil < 0
          ? "text-chart-2"
          : formatRecoil > 0
          ? "text-chart-2"
          : "inherit";

      return formatRecoil ? (
        <div>
          <span className={`${className} font-medium`}>{formatRecoil}%</span>
        </div>
      ) : (
        <span>0</span>
      );
    },
  }),
  columnHelperArmors.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: (row, id, filterValue) => {
      if (!filterValue) return true;

      const cost: number = row.getValue(id);
      const { min, max } = filterValue;

      if (min !== null && cost < min) return false;
      if (max !== null && cost > max) return false;

      return true;
    },
    cell: (info) => {
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  columnHelperScopes.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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
  columnHelperGasBlock.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/70 hover:text-foreground/80 underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesWeaponMod>[];

//Column Magazines | /weapon-mods/gear-mods
const columnHelperMagazines = createColumnHelper<MagazineItem>();
export const columnsMagazines = [
  columnHelperMagazines.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelperMagazines.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[20rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperMagazines.accessor((row) => row.properties?.capacity, {
    filterFn: UniversalNumberFormatFn,
    id: "capacity",
    header: (info) => <DefaultHeader info={info} name="Capacity" />,
    cell: (info) => {
      const capacity = info.getValue();

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm ">{capacity}</span>
        </div>
      );
    },
  }),
  columnHelperMagazines.accessor("properties.ergonomics", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="Ergo Modifier" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      if (initialValue > 0) {
        return (
          <div className="max-w-20">
            <span className="text-chart-2 font-medium">+{initialValue}</span>
          </div>
        );
      }

      if (initialValue < 0) {
        return <span className="text-chart-3">{initialValue}</span>;
      }

      return <span>{initialValue}</span>;
    },
  }),

  columnHelperMagazines.accessor("properties.malfunctionChance", {
    id: "malfunctionChance",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Malfunction Chance" />,
    cell: (info) => {
      const chance = info.getValue();
      return chance ? (
        <div>
          <span>{malfunctionChanceFormat(chance)}</span>
        </div>
      ) : (
        <span className="italic text-gray-600">N/A</span>
      );
    },
  }),
  columnHelperMagazines.accessor("properties.loadModifier", {
    id: "loadModifier",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Loading Modifier" />,
    cell: (info) => {
      const recoil = info.getValue();
      const formatRecoil = Math.round(recoil * 100);
      const className =
        formatRecoil < 0
          ? "text-chart-2"
          : formatRecoil > 0
          ? "text-chart-3"
          : "inherit";

      return formatRecoil ? (
        <div>
          <span className={`${className} font-medium`}>{formatRecoil}%</span>
        </div>
      ) : (
        <span>0</span>
      );
    },
  }),
  columnHelperMagazines.accessor("properties.ammoCheckModifier", {
    id: "ammoCheckModifier",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Ammo check Modifier" />,
    cell: (info) => {
      const recoil = info.getValue();
      const formatRecoil = Math.round(recoil * 100);
      const className =
        formatRecoil < 0
          ? "text-chart-2"
          : formatRecoil > 0
          ? "text-chart-3"
          : "inherit";

      return formatRecoil ? (
        <div>
          <span className={`${className} font-medium`}>{formatRecoil}%</span>
        </div>
      ) : (
        <span>0</span>
      );
    },
  }),
  columnHelperMagazines.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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
  columnHelperMagazines.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/70 hover:text-foreground/80 underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<MagazineItem>[];

//Column ItemPropertiesWeaponMod
const ItemPropertiesWeaponMod = createColumnHelper<ItemPropertiesWeaponMod>();
export const columnsItemPropertiesWeaponMod = [
  ItemPropertiesWeaponMod.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  ItemPropertiesWeaponMod.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[30rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  ItemPropertiesWeaponMod.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),
  ItemPropertiesWeaponMod.accessor("properties.ergonomics", {
    id: "ergoPenalty",
    header: (info) => <DefaultHeader info={info} name="Ergo Modifier" />,
    filterFn: UniversalNumberFormatFn,
    cell: (info) => {
      const initialValue = info.getValue<number>();

      if (!Number.isFinite(initialValue)) {
        return (
          <span className="text-muted-foreground text-sm italic">N/A</span>
        );
      }

      if (initialValue > 0) {
        return (
          <div className="max-w-20">
            <span className="text-chart-2 font-medium">+{initialValue}</span>
          </div>
        );
      }

      if (initialValue < 0) {
        return <span className="text-chart-3">{initialValue}</span>;
      }

      return <span>{initialValue}</span>;
    },
  }),

  ItemPropertiesWeaponMod.accessor("properties.recoilModifier", {
    id: "recoilModifier",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Recoil Modifier" />,
    cell: (info) => {
      const recoil = info.getValue();
      const formatRecoil = Math.round(recoil * 100);
      const className =
        formatRecoil < 0
          ? "text-chart-2"
          : formatRecoil > 0
          ? "text-chart-2"
          : "inherit";

      return formatRecoil ? (
        <div>
          <span className={`${className} font-medium`}>{formatRecoil}%</span>
        </div>
      ) : (
        <span>0</span>
      );
    },
  }),
  ItemPropertiesWeaponMod.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: (row, id, filterValue) => {
      if (!filterValue) return true;

      const cost: number = row.getValue(id);
      const { min, max } = filterValue;

      if (min !== null && cost < min) return false;
      if (max !== null && cost > max) return false;

      return true;
    },
    cell: (info) => {
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  ItemPropertiesWeaponMod.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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
  ItemPropertiesWeaponMod.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/70 hover:text-foreground/80 underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesWeaponMod>[];

//Column ItemPropertiesGlasses
const ItemPropertiesGlasses = createColumnHelper<ItemPropertiesGlasses>();
export const columnsItemPropertiesGlasses = [
  ItemPropertiesGlasses.accessor((row) => row.gridImageLink, {
    id: "icon",
    header: (info) => <DefaultHeader info={info} name="Icon" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/item/${row.id}`}>
          <div className="flex items-center gap-2 h-25">
            <Image
              src={row.gridImageLink}
              alt={name}
              width={75}
              height={75}
              className="aspect-square object-contain"
            />
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  ItemPropertiesGlasses.accessor((row) => row.name, {
    filterFn: "includesString",
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/item/${row.id}`}>
            <span className="text-sm truncate hover:text-chart-2 max-w-[15rem] block">
              {name}
            </span>
          </Link>
        </div>
      );
    },
  }),
  ItemPropertiesGlasses.accessor((row) => row.category?.parent?.name ?? "", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    filterFn: (row, _columnId, filterValue) => {
      const categoryName = row.original.category?.name ?? "";
      return categoryName === filterValue;
    },
    cell: (info) => {
      const row = info.row.original;
      const name = row.category?.name;
      const parentName = row.category?.parent?.name;

      return name ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted">{parentName}</span>
          <span className="text-base font-medium">{name}</span>
        </div>
      ) : (
        <span className="text-muted italic">N/A</span>
      );
    },
  }),
  ItemPropertiesGlasses.accessor((row) => row.properties?.class ?? "", {
    header: (info) => <DefaultHeader info={info} name="Armor Class" />,
    id: "class",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const armor = info.getValue();

      return armor > 0 ? (
        <>
          <div className="w-20 text-center">
            <span>{armor}</span>
          </div>
        </>
      ) : (
        <div className="w-20 text-center">
          <span>0</span>
        </div>
      );
    },
  }),
  ItemPropertiesGlasses.accessor("properties.material.name", {
    header: (info) => <DefaultHeader info={info} name="Material" />,
    id: "material",
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)) === filterValue,
    cell: (info) => {
      const name = info.getValue();
      return (
        <div className="flex grow max-w-40 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm truncate cursor-pointer max-w-[300px] block">
                {name}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  }),

  ItemPropertiesGlasses.accessor("properties.blindnessProtection", {
    id: "blindnessProtection",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Blindness Protection" />,
    cell: (info) => {
      const recoil = info.getValue();
      const formatRecoil = Math.round(recoil * 100);
      const className =
        formatRecoil < 0
          ? "text-chart-2"
          : formatRecoil > 0
          ? "text-chart-2"
          : "inherit";

      return formatRecoil ? (
        <div>
          <span className={`${className} font-medium`}>{formatRecoil}%</span>
        </div>
      ) : (
        <span>0</span>
      );
    },
  }),
  ItemPropertiesGlasses.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    id: "weight",
    filterFn: (row, id, filterValue) => {
      if (!filterValue) return true;

      const cost: number = row.getValue(id);
      const { min, max } = filterValue;

      if (min !== null && cost < min) return false;
      if (max !== null && cost > max) return false;

      return true;
    },
    cell: (info) => {
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  ItemPropertiesGlasses.accessor("avg24hPrice", {
    id: "avg24hPrice",
    filterFn: UniversalNumberFormatFn,
    header: (info) => <DefaultHeader info={info} name="Avg Flea Price (24h)" />,
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
  ItemPropertiesGlasses.accessor((row) => row.wikiLink, {
    id: "wikiLink",
    header: (info) => <DefaultHeader info={info} name="Wiki" />,
    cell: (info) => {
      const wikiLink = info.getValue();

      return (
        <div className="max-w-10">
          <a
            className="text-foreground/70 hover:text-foreground/80 underline text-sm  "
            href={wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a>
        </div>
      );
    },
    enableColumnFilter: false,
  }),
] as ColumnDef<ItemPropertiesGlasses>[];
