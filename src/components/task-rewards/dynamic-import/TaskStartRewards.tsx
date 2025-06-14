import { client } from "@/app/api/client";
import formatCurrency from "@/components/modules/currency-format";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type TaskStartRewardsProps = {
  taskId: string;
};

const TaskStartRewards = ({ taskId }: TaskStartRewardsProps) => {
  const { data: taskData } = useSuspenseQuery({
    queryKey: ["task-start-reward", taskId],
    queryFn: () => client.getTaskIdReward(taskId),
  });
  return (
    <>
      {taskData.startRewards?.items &&
      taskData.startRewards?.items.length > 0 ? (
        <ScrollArea className="rounded-md border">
          <ul className="p-2">
            {taskData.startRewards.items.map((reward) => (
              <Link
                href={`/item/${reward.item.id}`}
                prefetch={false}
                key={reward.item.id}
              >
                <li className="text-md md:text-base ">
                  • {formatCurrency(reward.item.name, reward.count)} x{" "}
                  <span className="text-chart-2 hover:text-foreground/80">
                    {reward.item.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <span>No starting rewards</span>
      )}
    </>
  );
};

export default TaskStartRewards;
