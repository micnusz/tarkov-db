import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "./ui/default-header";
import { AmmoProperties, BackpackItem, WeaponItem } from "@/app/api/types";
import Link from "next/link";

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
          <Link href={`/item/${row.id}`}>
            <span>{category}</span>
          </Link>
        </div>
      );
    },
    filterFn: "includesString",
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
    id: "caliber",
    header: (info) => <DefaultHeader info={info} name="Caliber" />,
    cell: (info) => {
      const caliberRaw = info.getValue<string>();

      return (
        <Link href={`/item/${info.row.original.item.id}`}>
          <div className={`flex flex-row items-center gap-2`}>
            <img src={info.row.original.item.iconLink} alt={caliberRaw} />
            <span>{caliberRaw}</span>
          </div>
        </Link>
      );
    },
    filterFn: "equals",
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
        <Link href={`/item/${info.row.original.item.id}`}>
          <span>{bulletName}</span>
        </Link>
      );
    },
    filterFn: "includesString",
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

  columnHelperAmmo.accessor("recoilModifier", {
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

  columnHelperAmmo.accessor("fragmentationChance", {
    header: (info) => <DefaultHeader info={info} name="Frag" />,
    cell: (info) => `${Math.round(info.getValue() * 100)}%`,
  }),

  columnHelperAmmo.accessor("initialSpeed", {
    header: (info) => <DefaultHeader info={info} name="Speed m/s" />,
    cell: (info) => info.getValue(),
  }),

  columnHelperAmmo.accessor("ricochetChance", {
    header: (info) => <DefaultHeader info={info} name="Ricochet" />,
    cell: (info) => `${Math.round(info.getValue() * 100)}%`,
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
