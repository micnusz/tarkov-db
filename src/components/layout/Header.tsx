"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import SearchBar from "../SearchBar";

const navLinks: { href: string; title: string }[] = [
  { href: "/ammo", title: "Ammo" },
  { href: "/barter", title: "Barter" },
  { href: "/items", title: "Items" },
  { href: "/maps", title: "Maps" },
  { href: "/", title: "Flea Market" },
  { href: "/tasks", title: "Tasks" },
];

export const Header = () => {
  return (
    <header className="bg-chart-5 px-4 py-6">
      <div className="w-full flex items-center justify-between relative">
        {/* Logo po lewej */}
        <div className="flex px-2 gap-6">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold duration-200 ease-in-out hover:text-chart-1">
              Tarkov.db
            </h1>
            <p className="text-sm text-muted-foreground  ">
              Database for Tarkov
            </p>
          </Link>
        </div>

        {/* Linki na środku (ukrywane na małych ekranach) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild className="text-lg">
                    <Link href={link.href}>{link.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex px-2 gap-6">
          <SearchBar />
        </div>
        {/* Hamburger menu po prawej (tylko na małych ekranach) */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MenuIcon className="w-8 h-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen mt-3 flex flex-col justify-center gap-6 bg-chart-5">
              {navLinks.map((link) => (
                <DropdownMenuItem
                  key={link.title}
                  className="text-xl justify-center py-2"
                >
                  <Link href={link.href}>{link.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
