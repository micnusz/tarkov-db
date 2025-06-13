import React from "react";
import { Barter } from "@/app/api/types";
import Link from "next/link";

type Props = {
  receivedFromTasks: Barter[];
  itemId: string;
};

const ReceivedFromTasks = ({ receivedFromTasks, itemId }: Props) => {
  // Filtrujemy zadania, które mają nagrodę z danym itemId
  const tasksWithReward = receivedFromTasks.filter((task) =>
    task.finishRewards.items.some((reward) => reward.item.id === itemId)
  );

  if (tasksWithReward.length === 0) {
    // Możesz tu zwrócić null lub komunikat, np.:
    return <span className="text-gray-400 italic">No rewards found</span>;
  }

  return (
    <>
      {tasksWithReward.map((task) => {
        const rewardItem = task.finishRewards.items.find(
          (reward) => reward.item.id === itemId
        );

        if (!rewardItem) return null; // bezpieczeństwo

        return (
          <li key={task.id} className="text-sm md:text-base">
            <span className="text-chart-3">{rewardItem.count}</span> x can be
            obtained as a quest reward from{" "}
            <Link href={`/task/${task.id}`}>
              <span className="text-chart-2 hover:text-foreground/80">
                {task.name}
              </span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default ReceivedFromTasks;
