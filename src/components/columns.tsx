import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "./ui/default-header";
import {
  AmmoProperties,
  BackpackItem,
  Item,
  ItemProperties,
  Task,
  Trader,
  VendorBuy,
  VendorSell,
  WeaponItem,
} from "@/app/api/types";
import Link from "next/link";
import { caliberColors } from "./ui/ammo-caliber-color";
import { ChevronRight } from "lucide-react";
// Trader sell
const columnHelperTraderSell = createColumnHelper<VendorSell>();
export const columnsTraderSell = (traders: Trader[]) =>
  [
    columnHelperTraderSell.accessor("vendor.name", {
      id: "name",
      header: (info) => <DefaultHeader info={info} name="Vendor:" />,
      cell: (info) => {
        const vendorName = info.getValue();
        const trader = traders.find((t) => t.name === vendorName);

        return (
          <div className="flex items-center gap-2">
            {trader && (
              <img
                src={trader.image4xLink}
                alt={trader.name}
                className="rounded-sm w-16"
              />
            )}
            <span>{vendorName}</span>
          </div>
        );
      },
    }),
    columnHelperTraderSell.accessor("price", {
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
  ] as ColumnDef<VendorSell, unknown>[];
// Trader Buy
const columnHelperTraderBuy = createColumnHelper<VendorBuy>();
export const columnsTraderBuy = (traders: Trader[]) =>
  [
    columnHelperTraderBuy.accessor("vendor.name", {
      id: "name",
      header: (info) => <DefaultHeader info={info} name="Vendor:" />,
      cell: (info) => {
        const vendorName = info.getValue();
        const trader = traders.find((t) => t.name === vendorName);

        return (
          <div className="flex items-center gap-2">
            {trader && (
              <img
                src={trader.image4xLink}
                alt={trader.name}
                className="rounded-sm w-16"
              />
            )}
            <span>{vendorName}</span>
          </div>
        );
      },
    }),
    columnHelperTraderBuy.accessor("price", {
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
  ] as ColumnDef<VendorBuy, unknown>[];

//Columns /weapon
const columnHelperWeapon = createColumnHelper<WeaponItem>();
export const columnsWeapon = [
  columnHelperWeapon.accessor("name", {
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
  }),
  columnHelperWeapon.accessor("properties.caliber", {
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
  columnHelperWeapon.accessor("properties.fireRate", {
    header: (info) => <DefaultHeader info={info} name="Fire Rate" />,
    cell: (info) => info.getValue(),
  }),
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
  columnHelperWeapon.accessor("properties.effectiveDistance", {
    header: (info) => <DefaultHeader info={info} name="Effective Range" />,
    cell: (info) => info.getValue(),
  }),
] as ColumnDef<WeaponItem, unknown>[];

//Columns /ammo
const columnHelperAmmo = createColumnHelper<AmmoProperties>();
export const columnsAmmo = [
  columnHelperAmmo.accessor("caliber", {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Caliber" />,
    cell: (info) => {
      const row = info.row.original;
      const caliberRaw = info.getValue<string>();
      const caliberStripped = caliberRaw.replace(/^Caliber/, "");
      const caliberFormatted = caliberStripped.replace(
        /^(\d)(\d{2}x\d+)/,
        "$1.$2"
      );
      const bgClass = caliberColors[caliberFormatted] ?? "bg-gray-500";

      return (
        <div className={`flex items-center gap-2 text-black  ${bgClass}`}>
          <Link href={`/item/${row.item.id}`}>
            <img src={row.item.iconLink} alt="ammo" width={40} />
            <span>{caliberFormatted}</span>
          </Link>
        </div>
      );
    },
  }),
  columnHelperAmmo.accessor("item.name", {
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const fullName = info.getValue<string>();
      const nameParts = fullName.split(" ");
      const bulletName = nameParts.slice(1).join(" ");
      return bulletName;
    },
  }),
  columnHelperAmmo.accessor("item.basePrice", {
    header: (info) => <DefaultHeader info={info} name="Price" />,
    cell: (info) => `${info.getValue()}₽`,
  }),
  columnHelperAmmo.accessor("penetrationPower", {
    header: (info) => <DefaultHeader info={info} name="Pen" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperAmmo.accessor("damage", {
    header: (info) => <DefaultHeader info={info} name="Dmg" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperAmmo.accessor("armorDamage", {
    header: (info) => <DefaultHeader info={info} name="ArD" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperAmmo.accessor("accuracyModifier", {
    header: (info) => <DefaultHeader info={info} name="Acc" />,
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
  columnHelperAmmo.accessor("recoilModifier", {
    header: (info) => <DefaultHeader info={info} name="Recoil" />,
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
  columnHelperAmmo.accessor("fragmentationChance", {
    header: (info) => <DefaultHeader info={info} name="Frag" />,
    cell: (info) => {
      const value = info.getValue<number>();
      return `${Math.round(value * 100)}%`;
    },
  }),
  columnHelperAmmo.accessor("initialSpeed", {
    header: (info) => <DefaultHeader info={info} name="Speed m/s" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperAmmo.accessor("ricochetChance", {
    header: (info) => <DefaultHeader info={info} name="Ricochet" />,
    cell: (info) => {
      const value = info.getValue<number>();
      return `${Math.round(value * 100)}%`;
    },
  }),
] as ColumnDef<AmmoProperties, unknown>[];

//Columns /backpacks
const columnHelperBackpacks = createColumnHelper<BackpackItem>();
export const columnsBackpacks = [
  columnHelperBackpacks.accessor((row) => row.name, {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Name" />,
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
            <span>{name}</span>
          </div>
        </Link>
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
    header: (info) => <DefaultHeader info={info} name="Slots inside" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperBackpacks.accessor("weight", {
    header: (info) => <DefaultHeader info={info} name="Weight" />,
    cell: (info) => info.getValue(),
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
          name="Cheapest Price
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
] as ColumnDef<BackpackItem, unknown>[];

//Columns /FleaMarket
const columnHelperFleaMarket = createColumnHelper<Item>();
export const columnsFleaMarket = [
  columnHelperBackpacks.accessor((row) => row.name, {
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

  columnHelperFleaMarket.accessor((row) => row.category?.name, {
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

  columnHelperFleaMarket.accessor("wikiLink", {
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

  columnHelperFleaMarket.accessor("avg24hPrice", {
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

  columnHelperFleaMarket.accessor("low24hPrice", {
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

  columnHelperFleaMarket.accessor("high24hPrice", {
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

  columnHelperFleaMarket.accessor(
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

  columnHelperFleaMarket.accessor(
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
] as ColumnDef<Item, unknown>[];
//Columns /Tasks
const columnHelperTasks = createColumnHelper<Task>();
export const columnsTasks = [
  columnHelperTasks.accessor((row) => row.name, {
    id: "name",
    header: (info) => <DefaultHeader info={info} name="Task" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <Link href={`/task/${row.id}`}>
          <div className="flex items-center gap-2 flex-wrap max-w-full">
            <img
              src={row.trader.imageLink}
              alt={name}
              className="w-18 object-contain"
            />
            <span className="text-sm font-medium break-words whitespace-normal">
              {name}
            </span>
          </div>
        </Link>
      );
    },
  }),
  columnHelperTasks.accessor("objectives", {
    header: (info) => <DefaultHeader info={info} name="Objectives" />,
    cell: (info) => {
      const objectives = info.getValue(); // TaskObjective[]
      return objectives && objectives.length > 0 ? (
        <div className="flex flex-col gap-1">
          {objectives.map((obj) => (
            <div
              key={obj.id}
              className={`text-sm ${
                obj.optional ? "text-gray-400 italic" : ""
              }`}
            >
              • {obj.description}
            </div>
          ))}
        </div>
      ) : (
        <span className="text-gray-400 italic">N/A</span>
      );
    },
  }),

  columnHelperTasks.accessor("minPlayerLevel", {
    header: (info) => <DefaultHeader info={info} name="Min. Level" />,
    cell: (info) => info.getValue(),
  }),
  columnHelperTasks.accessor("map.name", {
    header: (info) => <DefaultHeader info={info} name="Map" />,
    cell: (info) => {
      const mapName = info.getValue();
      return mapName ? (
        <span className="text-sm ">{mapName}</span>
      ) : (
        <span className="text-gray-400 italic">Any</span>
      );
    },
  }),

  columnHelperTasks.accessor("finishRewards.items", {
    header: (info) => <DefaultHeader info={info} name="Rewards" />,
    cell: (info) => {
      const rewards = info.getValue();
      return (
        <div className="flex flex-col gap-1">
          {rewards.map((reward) => (
            <div key={reward.item.id}>
              {reward.item.name}: {reward.count}
            </div>
          ))}
        </div>
      );
    },
  }),
  columnHelperTasks.accessor(
    (row) => ({
      kappa: row.kappaRequired,
      lightkeeper: row.lightkeeperRequired,
    }),
    {
      id: "requirements",
      header: (info) => <DefaultHeader info={info} name="Reqs" />,
      cell: (info) => {
        const { kappa, lightkeeper } = info.getValue();

        const hasAny = kappa || lightkeeper;

        return hasAny ? (
          <div className="flex items-center gap-2">
            {kappa && (
              <img
                src="/icons/kappa.png" // 🔁 zmień ścieżkę na faktyczną
                alt="Kappa Required"
                title="Kappa Required"
                className="w-5 h-5 object-contain"
              />
            )}
            {lightkeeper && (
              <img
                src="/icons/lightkeeper.png"
                alt="Lightkeeper Required"
                title="Lightkeeper Required"
                className="w-5 h-5 object-contain"
              />
            )}
          </div>
        ) : (
          <span className="text-gray-400 italic">Not Req</span>
        );
      },
    }
  ),
] as ColumnDef<Task, unknown>[];
