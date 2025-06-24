"use server";

import { Metadata } from "next";
import WeaponModsClientPage from "./WeaponModsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Weapon Mods - Tarkov.db",
    description: "Tarkov.db, Weapon Mods",
  };
};

const WeaponModsServerPage = () => {
  return <WeaponModsClientPage />;
};

export default WeaponModsServerPage;
