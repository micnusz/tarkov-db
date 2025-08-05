"use client";

import React, { useState } from "react";
import ItemCategoryCard from "@/components/ui/item-category-card";
import { itemCategories } from "@/lib/categories";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const canClear = search !== "";

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col gap-y-4 p-4 md:p-10">
        <div>
          <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
            Category
          </h1>
        </div>
        <div className="flex flex-row gap-x-2">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border w-full sm:w-[20rem] md:w-[20rem] duration-200 ease-in-out rounded-md border-3 border-input transition-colors hover:border-chart-1"
          />
          <Button
            onClick={() => handleClear()}
            variant={canClear ? "destructive" : "muted"}
          >
            Clear
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`${category.href}`}
              className="flex-1 sm:w-screen min-w-[15rem] md:min-w-[25rem]"
            >
              <ItemCategoryCard category={category} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ItemsClientPage;
