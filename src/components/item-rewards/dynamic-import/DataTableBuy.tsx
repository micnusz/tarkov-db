import { client } from "@/app/api/client";
import { VendorPrice } from "@/app/api/types";
import DefaultHeader from "@/components/ui/default-header";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
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
    queryKey: ["item-traders"],
    queryFn: () => client.getTraders(),
  });

  const columnHelperBuy = useMemo(() => createColumnHelper<VendorPrice>(), []);
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
                  <Image
                    aria-label={`Image of trader: ${trader.name}`}
                    src={trader.imageLink}
                    alt={`${trader.name}`}
                    width={50}
                    height={50}
                    className="aspect-square object-contain"
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
    [tradersData, columnHelperBuy]
  );
  return (
    <>
      <SimpleDataTable data={itemVendor.buyFor} columns={columnsBuy} />
    </>
  );
};

export default DataTableBuy;
