"use server";

import ItemCategoryCard from "@/components/ui/item-category-card";
import { itemCategories } from "@/lib/categories";
const ItemsPage = () => {
  return (
    <main className="flex flex-col gap-10 justify-center max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {itemCategories.map((category) => (
          <ItemCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
};

export default ItemsPage;
