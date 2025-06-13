import { Task } from "@/app/api/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import ReceivedFromTasks from "../ReceivedFromTask";

interface TaskRewardsProps {
  receivedFromTasks: Task[];
  itemId: string;
}

const TaskRewards = ({ receivedFromTasks, itemId }: TaskRewardsProps) => {
  return (
    <ScrollArea className="rounded-md border">
      <ul>
        <ReceivedFromTasks
          receivedFromTasks={receivedFromTasks}
          itemId={itemId}
        />
      </ul>
    </ScrollArea>
  );
};

export default TaskRewards;
