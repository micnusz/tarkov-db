import React from "react";
import ExperienceReward from "../ExperienceReward";
import SkillLevelReward from "../SkillLevelReward";
import TraderStandingReward from "../TraderStandingReward";
import ItemReward from "../ItemReward";
import PurchaseRewardUnlock from "../PurchaseUnlockReward";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "@/app/api/client";
import BarterUnlockReward from "../BarterUnlockReward";
import { TraderUnlockReward } from "../TraderUnlockReward";

type TaskFinishRewardsProps = {
  taskId: string;
  experience: number;
};

const TaskFinishRewards = ({ taskId, experience }: TaskFinishRewardsProps) => {
  const { data: taskData } = useSuspenseQuery({
    queryKey: ["task-finish-reward", taskId],
    queryFn: () => client.getTaskIdReward(taskId),
  });
  return (
    <>
      {taskData.finishRewards.items &&
      taskData.finishRewards.items.length > 0 ? (
        <ul className="p-2">
          <ExperienceReward experience={experience} />
          <SkillLevelReward
            skillLevelReward={taskData.finishRewards.skillLevelReward}
          />
          <TraderStandingReward
            traderStanding={taskData.finishRewards.traderStanding}
          />
          <ItemReward items={taskData.finishRewards.items ?? []} />
          <TraderUnlockReward
            traderUnlock={taskData.finishRewards.traderUnlock}
          />
          <BarterUnlockReward
            offerUnlock={taskData.finishRewards.offerUnlock ?? []}
          />
          <PurchaseRewardUnlock
            offerUnlock={taskData.finishRewards.offerUnlock ?? []}
          />
        </ul>
      ) : (
        <p className="italic text-gray-400">No rewards</p>
      )}
    </>
  );
};

export default TaskFinishRewards;
