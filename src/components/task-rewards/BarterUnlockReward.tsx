import Link from "next/link";
import React from "react";

const BarterUnlockReward = ({ offerUnlock }) => {
  return (
    <>
      {/* Barter Unlocks */}
      {offerUnlock?.length > 0 && (
        <>
          {offerUnlock.map((offer) => {
            const isBarter = offer.item.bartersFor?.some(
              (barter) => barter.trader?.name === offer.trader.name
            );

            return (
              isBarter && (
                <li
                  className="text-sm md:text-base"
                  key={`barter-${offer.item.id}-${offer.trader.id}-${offer.level}`}
                  aria-label={`Unlocks barter for ${offer.item.name}`}
                >
                  • Unlocks barter for{" "}
                  <Link
                    href={`/item/${offer.item.id}`}
                    aria-label={`Go to item page for ${offer.item.name}`}
                  >
                    <span className="text-chart-2 hover:text-foreground/80">
                      {offer.item.name}
                    </span>
                  </Link>{" "}
                  at {offer.trader.name} LL {offer.level}.
                </li>
              )
            );
          })}
        </>
      )}
    </>
  );
};

export default BarterUnlockReward;
