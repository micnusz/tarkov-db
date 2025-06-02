"use client";

import { client } from "@/app/api/client";
import {
  columnsTraderBuy,
  columnsTraderSell,
  columnsWeapon,
} from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";

type WeaponPageClientProps = {
  id: string;
};

export const WeaponPageClient = ({ id }: WeaponPageClientProps) => {
  const {
    data: weaponData,
    isPending: weaponLoading,
    error: weaponError,
  } = useQuery({
    queryKey: ["weapon", id],
    queryFn: () => client.getWeapon(id),
  });

  const {
    data: tradersData,
    isPending: tradersLoading,
    error: tradersError,
  } = useQuery({
    queryKey: ["traders"],
    queryFn: () => client.getTraders(),
  });

  if (weaponLoading || tradersLoading) return <span>Loading...</span>;
  if (weaponError)
    return <span>Error loading weapon: {weaponError.message}</span>;
  if (tradersError)
    return <span>Error loading traders: {tradersError.message}</span>;

  if (!weaponData || weaponData.length === 0)
    return <span>No weapon found.</span>;

  return (
    <div>
      {weaponData?.map((weapon) => (
        <div key={weapon.id} className="flex flex-col px-6 md:px-25 ">
          <div className="mb-6">
            <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
              {weapon.name}
            </h1>
          </div>
          <div className="w-full md:w-1/2 mb-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Description:
            </h2>
            <p className="leading-7">{weapon.description}</p>
            <a
              href={weapon.wikiLink}
              className="text-red-600 hover:text-black "
            >
              Wiki
            </a>
          </div>
          <div className="mb-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Sell for:
            </h2>
            <DataTable
              data={weapon.sellFor}
              columns={columnsTraderSell(tradersData)}
            />
          </div>
          <div className="mb-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Buy for:
            </h2>
            <DataTable
              data={weapon.buyFor}
              columns={columnsTraderBuy(tradersData)}
            />
          </div>
          <div className="mb-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Statistics:
            </h2>
            <DataTable data={weaponData} columns={columnsWeapon} />
          </div>
        </div>
      ))}
    </div>
  );
};
