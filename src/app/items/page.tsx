"use server";

import ItemCategoryCard from "@/components/ui/item-category-card";
import { itemCategories } from "@/lib/categories";
const ItemsPage = () => {
  return (
    <main className="p-4 md:p-10 flex flex-wrap gap-4 justify-center">
      {itemCategories.map((category) => (
        <div
          key={category.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
          <ItemCategoryCard category={category} />
        </div>
      ))}
    </main>
  );
};

export default ItemsPage;
