import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "./ui/default-header";
import {
  Ammo,
  BackpackItem,
  Trader,
  VendorBuy,
  VendorSell,
  WeaponItem,
} from "@/app/api/types";
import Link from "next/link";
import { caliberColors } from "./ui/ammo-caliber-color";

//Columns weapon/[id]/WeaponPageClient
const columnHelperTraderSell = createColumnHelper<VendorSell>();
export const columnsTraderSell = (traders: Trader[]) =>
  [
    columnHelperTraderSell.accessor("vendor.name", {
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

        const value = isUSD ? row.price : row.priceRUB;
        const symbol = isUSD ? "$" : "₽";

        return `${value.toLocaleString()} ${symbol}`;
      },
    }),
  ] as ColumnDef<VendorSell, unknown>[];

//Columns weapon/[id]/weaponPageClient
const columnHelperTraderBuy = createColumnHelper<VendorBuy>();
export const columnsTraderBuy = (traders: Trader[]) =>
  [
    columnHelperTraderBuy.accessor("vendor.name", {
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

        return `${value.toLocaleString()} ${symbol}`;
      },
    }),
  ] as ColumnDef<VendorBuy, unknown>[];

//Columns /weapon
const columnHelperWeapon = createColumnHelper<WeaponItem>();
export const columnsWeapon = [
  columnHelperWeapon.accessor("name", {
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const row = info.row.original;
      const caliberRaw = info.getValue<string>();
      return (
        <div className="flex flex-row gap-8">
          <Link href={`weapons/${row.id}`}>
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
const columnHelperAmmo = createColumnHelper<Ammo>();
export const columnsAmmo = [
  columnHelperAmmo.accessor("caliber", {
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
          <img src={row.item.iconLink} alt="ammo" width={40} />
          <span>{caliberFormatted}</span>
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
] as ColumnDef<Ammo, unknown>[];

//Columns /backpacks
const columnHelperBackpacks = createColumnHelper<BackpackItem>();
export const columnsBackpacks = [
  columnHelperBackpacks.accessor((row) => row.name, {
    id: "nameWithImage",
    header: (info) => <DefaultHeader info={info} name="Name" />,
    cell: (info) => {
      const name = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex items-center gap-2">
          <img
            src={row.gridImageLink}
            alt={name}
            className="w-32 object-contain"
          />
          <span>{name}</span>
        </div>
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
