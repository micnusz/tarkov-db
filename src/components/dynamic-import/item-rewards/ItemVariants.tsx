"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";

interface Variant {
  id: string;
  name: string;
  isOriginalWeapon?: boolean;
}

interface ItemPropertiesPreset {
  __typename?: string;
  presets?: Variant[] | string;
  baseItem?: {
    id: string;
    name: string;
    properties?: {
      presets?: Variant[] | string;
    };
  };
}

interface ItemData {
  id: string;
  name: string;
  properties?: ItemPropertiesPreset;
}

interface ItemVariantsProps {
  itemData: ItemData;
}

const ItemVariants: React.FC<ItemVariantsProps> = ({ itemData }) => {
  const presetVariantsRaw =
    itemData.properties?.presets ??
    itemData.properties?.baseItem?.properties?.presets ??
    [];

  const presetVariants = Array.isArray(presetVariantsRaw)
    ? presetVariantsRaw
    : [];

  if (presetVariants.length === 0) return null;

  const isPreset = itemData.properties?.__typename === "ItemPropertiesPreset";

  const baseWeapon =
    isPreset && itemData.properties?.baseItem
      ? {
          id: itemData.properties.baseItem.id,
          name: itemData.properties.baseItem.name,
          isOriginalWeapon: true,
        }
      : null;

  const variants = baseWeapon
    ? [baseWeapon, ...presetVariants]
    : presetVariants;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">Variants:</AccordionTrigger>
        <AccordionContent>
          <ul>
            <ScrollArea className="h-[10rem]">
              {variants.map((variant) => (
                <li key={variant.id}>
                  •{" "}
                  {variant.id === itemData.id ? (
                    <span className="font-semibold text-foreground">
                      {variant.name} (current)
                    </span>
                  ) : (
                    <span className="text-chart-2 hover:text-foreground/80">
                      <Link href={`/item/${variant.id}`}>
                        {variant.name}
                        {variant.isOriginalWeapon && " (base)"}
                      </Link>
                    </span>
                  )}
                </li>
              ))}
            </ScrollArea>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ItemVariants;
