import {
  BackpackItem,
  Barter,
  BarterItem,
  BaseItem,
  CraftingProperties,
  Task,
  WeaponItem,
} from "@/app/api/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "../ui/default-header";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Briefcase, TowerControl } from "lucide-react";
import CraftingDurationFormat from "../modules/crafting-duration-format";
import Image from "next/image";

//Column Barter
const columnHelperBarter = createColumnHelper<Barter>();
export const columnsBarter = [
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
        <div className="relative">
          <Image
            src={trader.imageLink}
            alt={trader.name}
            width={75}
            height={75}
            loading="lazy"
            className="aspect-square object-contain"
          />
          {level != null && (
            <Badge className=" absolute left-10 -top-2 -right-1 text-xs px-1.5 py-0.5">
              Lv. {level}
            </Badge>
          )}
        </div>
      );
    },
  }),
  columnHelperBarter.accessor((row) => row.rewardItems?.[0]?.item?.name ?? "", {
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
          <Link href={`/item/${item.id}`}>
            <span className="text-sm  truncate hover:text-chart-2 ">
              {item.name}
            </span>
          </Link>
        </div>
      );
    },
    filterFn: "includesString",
  }),
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
] as ColumnDef<Barter>[];

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
                After completing {task.trader.name}'s task -
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
            <div className="relative shrink-0">
              {item.gridImageLink && (
                <Image
                  src={item.gridImageLink}
                  alt={item.name}
                  width={100}
                  height={100}
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
              className="aspect-square object-contain"
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
            <span className="hover:text-chart-2">{caliberRaw}</span>
          </Link>
        </div>
      );
    },
    filterFn: "includesString",
  }),
  columnHelperWeapon.accessor("category.name", {
    id: "category",
    header: (info) => <DefaultHeader info={info} name="Category" />,
    cell: (info) => {
      const row = info.row.original;
      const category = info.getValue<string>();
      return (
        <div className="flex flex-row gap-8">
          <span>{category}</span>
        </div>
      );
    },
    filterFn: "includesString",
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
    header: (info) => <DefaultHeader info={info} name="Vertical Recoil" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperWeapon.accessor("properties.recoilHorizontal", {
    header: (info) => <DefaultHeader info={info} name="Horizontal Recoil" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperWeapon.accessor("properties.ergonomics", {
    header: (info) => <DefaultHeader info={info} name="Ergonomics" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperWeapon.accessor(
    (row) => row.properties.baseItem?.properties?.effectiveDistance ?? null,
    {
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
  columnHelperBackpacks.accessor((row) => row.name, {
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
    filterFn: "includesString",
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
    header: (info) => <DefaultHeader info={info} name="Slots inside" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperBackpacks.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    cell: (info) => {
      const weight = info.getValue();
      return (
        <>
          <span>{info.getValue()}kg</span>
        </>
      );
    },
  }),
  columnHelperBackpacks.accessor(
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
          name="Best to buy from
"
        />
      ),
      cell: (info) => `${info.getValue()}`,
    }
  ),
  columnHelperBackpacks.accessor("properties.ergoPenalty", {
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
  columnHelperBackpacks.accessor("properties.speedPenalty", {
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
  columnHelperBackpacks.accessor("properties.turnPenalty", {
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
] as ColumnDef<BackpackItem>[];

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
            width={ta}
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
          <div className="flex items-center gap-2">
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
  }),
  columnHelper.accessor((row) => row.map?.name ?? "", {
    id: "map.name",
    filterFn: "equals",
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
  columnHelper.accessor(
    (row) => ({
      kappa: row.kappaRequired,
      lightkeeper: row.lightkeeperRequired,
    }),
    {
      id: "requirements",
      header: (info) => <DefaultHeader info={info} name="Required for K/L" />,
      cell: (info) => {
        const { kappa, lightkeeper } = info.getValue();
        const hasAny = kappa || lightkeeper;

        return hasAny ? (
          <div className="flex items-center gap-2 justify-center">
            {kappa && (
              <Tooltip>
                <TooltipTrigger>
                  <Briefcase className="w-5 h-5" aria-label="Kappa icon" />
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
    }
  ),
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
            <span className="text-sm font-medium">{name}</span>
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
  columnHelperFlea.accessor("wikiLink", {
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

  columnHelperFlea.accessor(
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

  columnHelperFlea.accessor(
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
] as ColumnDef<BaseItem>[];
