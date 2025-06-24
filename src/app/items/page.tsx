"use server";

import { Metadata } from "next";
import ItemsClientPage from "./ItemsClientPage";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Items - Tarkov.db",
    description: "Tarkov.db, Items",
  };
};

const ItemsServerPage = () => {
  return <ItemsClientPage />;
};

export default ItemsServerPage;
