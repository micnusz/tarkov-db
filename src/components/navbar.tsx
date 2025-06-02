"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

export const Navbar = () => {
  return (
    <div className="relative w-screen p-6 mb-6">
      <div className="absolute right-4">
        <ModeToggle />
      </div>

      <div className="flex justify-center gap-4">
        <Button>
          <Link href="/ammo">AMMO</Link>
        </Button>
        <Button>
          <Link href="/barter">BARTER</Link>
        </Button>
        <Button>
          <Link href="/items">ITEMS</Link>
        </Button>
        <Button>
          <Link href="/maps">MAPS</Link>
        </Button>
        <Button>
          <Link href="/tasks">TASKS</Link>
        </Button>
      </div>
    </div>
  );
};
