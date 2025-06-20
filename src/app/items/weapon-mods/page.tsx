"use server";

import ItemCategoryCard from "@/components/ui/item-category-card";
import { weaponModsCategories } from "@/lib/categories";
import { Metadata } from "next";
import Link from "next/link";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Weapon Mods - Tarkov.db",
    description: "Tarkov.db, Weapon Mods",
  };
};

const WeaponModsServerPage = () => {
  return (
    <main className="p-4 md:p-10 flex flex-wrap gap-4 justify-center">
      {weaponModsCategories.map((category) => (
        <div
          key={category.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
          <Link href={`/items/weapon-mods/${category.href}/`}>
            <ItemCategoryCard category={category} />
          </Link>
        </div>
      ))}
    </main>
  );
};

export default WeaponModsServerPage;
