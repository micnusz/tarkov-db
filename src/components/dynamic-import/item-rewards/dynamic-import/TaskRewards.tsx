import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import ReceivedFromTasks from "../ReceivedFromTask";
import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface TaskRewardsProps {
  itemId: string;
}

const TaskRewards = ({ itemId }: TaskRewardsProps) => {
  const { data: itemTask } = useSuspenseQuery({
    queryKey: ["item-task-obtained", itemId],
    queryFn: () => client.getItemIdTask(itemId),
  });

  return (
    <>
      <ScrollArea className="rounded-md border p-2">
        <ul>
          <ReceivedFromTasks
            receivedFromTasks={itemTask.receivedFromTasks}
            itemId={itemId}
          />
        </ul>
      </ScrollArea>
    </>
  );
};

export default TaskRewards;
