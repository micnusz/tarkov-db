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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const navLinks: { href: string; title: string }[] = [
  { href: "/ammo", title: "Ammo" },
  { href: "/barters", title: "Barters" },
  { href: "/items", title: "Items" },
  { href: "/", title: "Flea Market" },
  { href: "/tasks", title: "Tasks" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-chart-5 border-b">
      <div className="max-w-screen mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link aria-label="Home" href="/" className="text-2xl font-bold px-6">
          Tarkov.db
        </Link>

        {/* Desktop nav & Search */}
        <div
          aria-label="Main navigation"
          className="hidden lg:flex items-center space-x-6 flex-1"
        >
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild className="text-lg">
                    <Link
                      prefetch={true}
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
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
              <Button
                className="p-2 rounded-md focus:outline-none"
                variant="ghost"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label="Open mobile menu"
              >
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-black/60 backdrop-blur-sm w-screen [&>button]:hidden "
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="px-4 py-6 space-y-6">
                {/* SearchBar wewnątrz Sheet */}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <SearchBar />
                  </div>
                  <SheetClose
                    className="p-2 rounded-md hover:bg-muted transition"
                    aria-label="Close mobile menu"
                  >
                    Close
                  </SheetClose>
                </div>

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
