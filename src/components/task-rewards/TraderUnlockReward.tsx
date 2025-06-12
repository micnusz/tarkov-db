"use client";

const TraderUnlockReward = ({ traderUnlock }) => {
  return (
    <>
      {/* Trader Unlocks */}
      {traderUnlock?.length > 0 && (
        <>
          {traderUnlock?.map((trader) => (
            <li key={trader.id}>• Unlocks {trader.name} as a trader.</li>
          ))}
        </>
      )}
    </>
  );
};

export default TraderUnlockReward;
