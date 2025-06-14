import React from "react";
import ItemVariants from "../ItemVariants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "@/app/api/client";

type VariantsProps = {
  itemId: string;
};

const Variants = ({ itemId }: VariantsProps) => {
  const { data: itemData } = useSuspenseQuery({
    queryKey: ["item-variant", itemId],
    queryFn: () => client.getItemIdVariants(itemId),
  });

  return <ItemVariants itemData={itemData} />;
};

export default Variants;
