import { Barter, BarterItem } from "@/app/api/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "../ui/default-header";
import { Badge } from "../ui/badge";

//Column Brter
const columnHelperBarter = createColumnHelper<Barter>();
export const columnsBarter: ColumnDef<Barter, any>[] = [
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
        <div className="relative w-16 h-16">
          <img
            className="w-16 h-16 aspect-square object-contain"
            src={trader.imageLink}
            alt={trader.name}
          />
          {level != null && (
            <Badge className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
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
              <img
                src={item.gridImageLink}
                alt={item.name}
                className="w-[5rem] aspect-square object-contain shrink-0"
              />
            )}
            {amount !== undefined && (
              <Badge className="bg-chart-3 absolute -top-1 -right-1 text-xs px-1.5 py-0.5">
                {amount}
              </Badge>
            )}
          </div>
          <span className="text-sm font-medium truncate">{item.name}</span>
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
];
