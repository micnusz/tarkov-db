"use server";

import ItemCategoryCard from "@/components/ui/item-category-card";
import { itemCategories } from "@/lib/categories";
const ItemsPage = () => {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-wrap -mx-2">
        {itemCategories.map((category) => (
          <div
            key={category.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <ItemCategoryCard category={category} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ItemsPage;
