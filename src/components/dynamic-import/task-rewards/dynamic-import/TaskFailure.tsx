import { client } from "@/app/api/client";
import traderStandingFormat from "@/components/modules/trader-standing-format";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type TaskFailureProps = {
  taskId: string;
};

const TaskFailure = ({ taskId }: TaskFailureProps) => {
  const { data: taskData } = useSuspenseQuery({
    queryKey: ["task-failure-outcome", taskId],
    queryFn: () => client.getTaskIdFailure(taskId),
  });
  return (
    <>
      {taskData.failureOutcome?.traderStanding &&
      taskData.failureOutcome?.traderStanding?.length > 0 ? (
        <ScrollArea className="rounded-md border">
          <ul className="p-2">
            {taskData.failureOutcome?.traderStanding?.map((failure) => (
              <li
                key={failure.trader.id}
                className="text-sm md:text-base"
                aria-label={`Trader standing penalty: ${failure.standing}`}
              >
                • {traderStandingFormat(failure.standing)} {failure.trader.name}{" "}
                Rep
              </li>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <span>No failure outcome</span>
      )}
    </>
  );
};

export default TaskFailure;
