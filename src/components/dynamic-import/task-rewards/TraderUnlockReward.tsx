"use client";
import { Trader } from "@/app/api/types";

type TraderUnlockRewardProps = {
  traderUnlock?: Pick<Trader, "id" | "name">[]; // lub Trader[] jeśli masz pełny typ
};

export const TraderUnlockReward = ({
  traderUnlock,
}: TraderUnlockRewardProps) => {
  if (!traderUnlock || traderUnlock.length === 0) return null;

  return (
    <>
      {traderUnlock.map((trader) => (
        <li key={trader.id}>• Unlocks {trader.name} as a trader.</li>
      ))}
    </>
  );
};
