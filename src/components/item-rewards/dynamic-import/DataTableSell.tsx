import { Trader, VendorPrice } from "@/app/api/types";
import DefaultHeader from "@/components/ui/default-header";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";

type DataTableBuyProps = {
  tradersData: Trader[];
  data: VendorPrice[];
};

const DataTableBuy = ({ tradersData, data }: DataTableBuyProps) => {
  const columnHelperSell = createColumnHelper<VendorPrice>();
  const columnsSell = useMemo(
    () =>
      [
        columnHelperSell.accessor("vendor.name", {
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
        columnHelperSell.accessor("price", {
          header: (info) => <DefaultHeader info={info} name="Price:" />,
          cell: (info) => {
            const row = info.row.original;
            const vendorName = row.vendor.name;
            const isUSD = vendorName === "Peacekeeper";

            const price = row.price;
            const priceRUB = row.priceRUB;

            const value = isUSD ? price : priceRUB;
            const symbol = isUSD ? "$" : "₽";

            if (typeof value !== "number" || isNaN(value)) return "—";

            return `${value.toLocaleString()} ${symbol}`;
          },
        }),
      ] as ColumnDef<VendorPrice>[],
    [tradersData]
  );
  return (
    <>
      <SimpleDataTable data={data} columns={columnsSell} />
    </>
  );
};

export default DataTableBuy;
