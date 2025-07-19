"use client";
import { client } from "@/app/api/client";
import traderStandingFormat from "@/components/modules/trader-standing-format";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";

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
        <ScrollArea className="rounded-md border p-2">
          <ul>
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
        <ScrollArea className="rounded-md border p-2">
          <span>No failure outcome.</span>
        </ScrollArea>
      )}
    </>
  );
};

export default TaskFailure;
