"use client";
import React from "react";
import formatCurrency from "../modules/currency-format";
import Link from "next/link";
import { RewardItem } from "@/app/api/types";

type Props = {
  items: RewardItem[];
};

const ItemReward = ({ items }: Props) => {
  return (
    <>
      {/* Items Rewards */}
      {items?.map((reward) => (
        <li key={reward.item.id} className="text-md md:text-base ">
          <Link
            href={`/item/${reward.item.id}`}
            prefetch={false}
            aria-label={`Go to item page for ${reward.item.name}`}
          >
            • {formatCurrency(reward.item.name, reward.count)} x{" "}
            <span className="text-chart-2 hover:text-foreground/80">
              {reward.item.name}.
            </span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default ItemReward;
