import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type ItemCategoryCardProps = {
  category: {
    id: string;
    href: string;
    name: string;
  };
};

const ItemCategoryCard = ({ category }: ItemCategoryCardProps) => {
  return (
    <Link href={category.href}>
      <Card
        key={category.id}
        className="bg-accent h-48 w-full shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl p-4 flex flex-col justify-center"
      >
        <CardHeader className="text-center ">
          <CardTitle className="text-lg font-semibold">
            {category.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ItemCategoryCard;
