"use client";

import React, { useState } from "react";
import ItemCategoryCard from "@/components/ui/item-category-card";
import { itemCategories } from "@/lib/categories";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const ItemsClientPage = () => {
  const [search, setSearch] = useState("");
  const filteredCategories = itemCategories
    .filter((category) => {
      const query = search.toLowerCase();
      return (
        category.id.toLowerCase().includes(query) ||
        category.name.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
        Items
      </h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-[10rem] sm:w-[20rem] md:w-[20rem] duration-200 ease-in-out rounded-md border-3 border-input transition-colors hover:border-chart-1"
        />
      </div>
      <div
        className="
          grid gap-4 justify-center
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {filteredCategories.map((category) => (
          <Link key={category.id} href={`${category.href}`}>
            <ItemCategoryCard category={category} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemsClientPage;
