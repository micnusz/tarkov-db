"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { JSX } from "react";

type CategoryCardProps = {
  name: string;
  href: string;
  id: string;
  icon: JSX.Element;
};

const CategoryCard = ({ name, href, icon, id }: CategoryCardProps) => {
  return (
    <Link href={href} passHref aria-label={`Przejdź do kategorii ${name}`}>
      <Card
        key={id}
        role="link"
        tabIndex={0}
        className="bg-accent h-48 w-full shadow-md hover:shadow-lg rounded-lg hover:bg-border flex flex-col justify-center hover:scale-104 transition duration-150 ease-in-out shadow-xl/10 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <CardContent>
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle className="flex flex-col items-center">
              <div className="mb-2 text-5xl" aria-hidden="true">
                {icon}
              </div>
              <h3 className="font-semibold text-2xl">{name}</h3>
            </CardTitle>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
