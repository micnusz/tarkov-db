import { Category } from "@/app/api/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type ItemCategoryCardProps = [category: Category];

const ItemCategoryCard = ({ category }: ItemCategoryCardProps) => {
  return (
    <Link href={`items/${category.id}`}>
      <Card
        key={category.id}
        className="py-20 flex text-center hover:border hover:border-indigo-600"
      >
        <CardHeader>
          <CardTitle className="">{category.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ItemCategoryCard;
