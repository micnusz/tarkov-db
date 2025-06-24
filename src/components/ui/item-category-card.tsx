"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type ItemCategoryCardProps = {
  category: {
    id: string;
    href: string;
    name: string;
  };
};

const ItemCategoryCard = ({ category }: ItemCategoryCardProps) => {
  return (
    <Card
      key={category.id}
      className="bg-accent h-48 w-full shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg hover:bg-border flex flex-col justify-center"
    >
      <CardHeader className="text-center">
        <CardTitle className=" font-semibold">{category.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ItemCategoryCard;
