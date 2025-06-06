"use client";

import { client } from "@/app/api/client";
import { columnsTraderBuy, columnsTraderSell } from "@/components/columns";
import { SimpleDataTable } from "@/components/ui/simple-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type ItemPageClientProps = {
  id: string;
};

const ItemPageClient = ({ id }: ItemPageClientProps) => {
  const { data: itemData = [] } = useSuspenseQuery({
    queryKey: ["item", id],
    queryFn: () => client.getItem(id),
  });
  const { data: tradersData } = useSuspenseQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  return (
    <div>
      {itemData.map((item) => (
        <div key={item.id} className="flex flex-col px-6 md:px-20">
          <div className="mb-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-left text-4xl font-extrabold tracking-tight">
                {item.name}
              </h1>
              <h2 className="mt-4 border-b pb-2 text-2xl font-semibold tracking-tight">
                Description:
              </h2>
              <p className="leading-7 mt-2">{item.description}</p>
              <a
                href={item.wikiLink}
                className="text-red-600 hover:text-black mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiki
              </a>
            </div>

            <div className="flex justify-center items-center md:w-1/2">
              <img
                src={item.gridImageLink}
                alt={item.name}
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
              Sell for:
            </h2>
            {tradersData && (
              <SimpleDataTable
                data={item.sellFor}
                columns={columnsTraderSell(tradersData)}
              />
            )}
          </div>

          <div className="mb-6">
            <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
              Buy for:
            </h2>
            {tradersData && (
              <SimpleDataTable
                data={item.buyFor}
                columns={columnsTraderBuy(tradersData)}
              />
            )}
          </div>

          <div className="mb-6">
            <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
              Statistics:
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemPageClient;
