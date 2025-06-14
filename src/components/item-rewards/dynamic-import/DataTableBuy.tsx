import { client } from "@/app/api/client";
import { BaseItem, Trader, VendorPrice } from "@/app/api/types";
import DefaultHeader from "@/components/ui/default-header";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";

type DataTableBuyProps = {
  itemId: string;
};

const DataTableBuy = ({ itemId }: DataTableBuyProps) => {
  const { data: itemVendor } = useSuspenseQuery({
    queryKey: ["item-price-buy", itemId],
    queryFn: () => client.getItemIdPrices(itemId),
  });
  const { data: tradersData } = useSuspenseQuery({
    queryKey: ["item-trader-buy"],
    queryFn: () => client.getTraders(),
  });

  const columnHelperBuy = createColumnHelper<VendorPrice>();
  const columnsBuy = useMemo(
    () =>
      [
        columnHelperBuy.accessor("vendor.name", {
          id: "name",
          filterFn: "includesString",
          header: (info) => <DefaultHeader info={info} name="Trader" />,
          cell: (info) => {
            const vendorName = info.getValue();
            const trader = tradersData.find((t) => t.name === vendorName);

            return (
              <div className="flex items-center gap-2">
                {trader && (
                  <img
                    src={trader.image4xLink}
                    alt={trader.name}
                    className="rounded-sm w-16 h-16 object-contain"
                  />
                )}
                <span className="text-md font-medium p-2">{vendorName}</span>
              </div>
            );
          },
        }),

        columnHelperBuy.accessor("price", {
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
      ] as ColumnDef<VendorPrice>[],
    [tradersData]
  );
  return (
    <>
      <SimpleDataTable data={itemVendor.buyFor} columns={columnsBuy} />
    </>
  );
};

export default DataTableBuy;
