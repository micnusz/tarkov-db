"use server";
import CategoryCard from "@/components/category-card";
import {
  ClipboardCheck,
  Crosshair,
  Handshake,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Metadata } from "next";
import { JSX } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home Page - Tarkov.db",
    description: "Tarkov.db, Home Page",
  };
};
export default async function Home() {
  const cards: { href: string; name: string; id: string; icon: JSX.Element }[] =
    [
      {
        href: "/ammo",
        name: "Ammo",
        id: "ammo",
        icon: <Crosshair className="w-8 h-8" />,
      },
      {
        href: "/barters",
        name: "Barters",
        id: "barters",
        icon: <Handshake className="w-8 h-8" />,
      },
      {
        href: "/items",
        name: "Items",
        id: "items",
        icon: <Package className="w-8 h-8" />,
      },
      {
        href: "/flea-market",
        name: "Flea Market",
        id: "flea-market",
        icon: <ShoppingCart className="w-8 h-8" />,
      },
      {
        href: "/tasks",
        name: "Tasks",
        id: "tasks",
        icon: <ClipboardCheck className="w-8 h-8" />,
      },
    ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-col justify-center items-center p-4 md:p-10">
        <div className="flex flex-col gap-y-8">
          {/* Page header */}
          <div className="flex flex-col gap-y-4  p-4">
            <h1 className="scroll-m-20 text-center text-4xl md:text-4xl font-bold tracking-tight text-balance text-chart-2">
              Tarkov.db
            </h1>

            <h2 className="scroll-m-20 text-center text-2xl md:text-3xl tracking-tight text-balance">
              Get all Escape from Tarkov game stats and information in one
              place.
            </h2>
          </div>
          {/* Main cards */}
          <div className="flex flex-col md:p-4 gap-4">
            <div className="flex flex-wrap gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex-1 sm:w-screen min-w-[15rem] md:min-w-[18rem]"
                >
                  <CategoryCard
                    name={card.name}
                    href={card.href}
                    icon={card.icon}
                    id={card.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
