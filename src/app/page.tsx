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
import { FaGithub } from "react-icons/fa6";

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
    <div className="flex-col justify-center items-center p-4 md:p-10">
      <div className="flex flex-col gap-y-8">
        {/* Page header */}
        <div className="flex flex-col gap-y-4  p-4">
          <h1 className="scroll-m-20 text-center text-4xl md:text-4xl font-extrabold tracking-tight text-balance">
            Tarkov.db
          </h1>

          <h2 className="scroll-m-20 text-center text-2xl md:text-3xl tracking-tight text-balance">
            Get all Escape from Tarkov game stats and information in one place.
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
        {/* About Section */}
        <div>
          <div className="flex flex-col md:p-4 w-full max-w-prose">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-balance border-b pb-4">
              About Tarkov.db
            </h1>

            <p className="leading-7 text-lg mt-2">
              Tarkov.db is a web application designed to provide Escape from
              Tarkov players with easy access to detailed information about
              in-game items and quests.
            </p>

            <div className="mt-4">
              <a
                href="https://github.com/micnusz/tarkov-db"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Go to the GitHub repository for Tarkov.db"
                className="inline-flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300 hover:text-muted-foreground transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FaGithub aria-hidden="true" />
                <span className="sr-only">GitHub repository</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
