"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";
import SearchBar from "../SearchBar";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const navLinks: { href: string; title: string }[] = [
  { href: "/ammo", title: "Ammo" },
  { href: "/barter", title: "Barter" },
  { href: "/items", title: "Items" },
  { href: "/maps", title: "Maps" },
  { href: "/", title: "Flea Market" },
  { href: "/tasks", title: "Tasks" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="bg-chart-5 border-b">
      <div className="max-w-screen mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold px-6">
          Tarkov.db
        </Link>

        {/* Desktop nav & Search */}
        <div className="hidden lg:flex items-center space-x-6 flex-1">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild className="text-lg">
                    <Link prefetch={true} href={link.href}>
                      {link.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto ">
            <SearchBar />
          </div>
        </div>

        {/* Mobile hamburger + sheet (SearchBar przeniesiony do środka) */}
        <div className="flex lg:hidden items-center">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md focus:outline-none">
                {mobileOpen ? (
                  <MenuIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/60 backdrop-blur-sm w-full max-w-sm"
            >
              <div className="px-4 py-6 space-y-6">
                {/* SearchBar wewnątrz Sheet */}
                <SearchBar />

                {/* Linki */}
                <SheetTitle className="text-muted">Menu</SheetTitle>
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block text-lg font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
