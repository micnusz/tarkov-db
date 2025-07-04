import traderStandingFormat from "@/components/modules/trader-standing-format";
import React from "react";

type Props = {
  traderStanding?: {
    standing: number;
    trader: {
      name: string;
      id: string;
    };
  }[];
};

export const TraderStandingReward = ({ traderStanding }: Props) => {
  return (
    <>
      {/* Trader standing Reward */}
      {traderStanding && traderStanding.length > 0 && (
        <>
          {traderStanding.map((reward) => (
            <li
              key={reward.trader.id}
              className="text-sm md:text-base"
              aria-label={`Trader standing reward: ${reward.standing}`}
            >
              • {traderStandingFormat(reward.standing)} {reward.trader.name} Rep
            </li>
          ))}
        </>
      )}
    </>
  );
};

export default TraderStandingReward;
