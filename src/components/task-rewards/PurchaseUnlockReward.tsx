"use client";

import Link from "next/link";

const PurchaseRewardUnlock = ({ offerUnlock }) => {
  return (
    <>
      {/* Purchase Unlocks */}
      {offerUnlock?.length > 0 && (
        <>
          {offerUnlock?.map((offer) => {
            const isPurchase = offer.item.buyFor?.some(
              (buy) => buy.vendor?.name === offer.trader.name
            );

            return (
              isPurchase && (
                <li
                  className="text-sm md:text-base"
                  key={`purchase-${offer.item.id}-${offer.trader.id}-${offer.level}`}
                  aria-label={`Unlocks purchase of ${offer.item.name}`}
                >
                  • Unlocks purchase of{" "}
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

export default PurchaseRewardUnlock;
