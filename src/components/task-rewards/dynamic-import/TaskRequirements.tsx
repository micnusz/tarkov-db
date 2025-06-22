import { client } from "@/app/api/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type Props = {
  taskId: string;
};

const TaskRequirements = ({ taskId }: Props) => {
  const { data: taskData } = useSuspenseQuery({
    queryKey: ["task-requirements", taskId],
    queryFn: () => client.getTaskIdRequirements(taskId),
  });

  return (
    <>
      {taskData.taskRequirements.length > 0 ? (
        <ScrollArea className="rounded-md border ">
          <ul>
            {taskData.taskRequirements.map((req) => (
              <li key={req.task.id} className="text-sm md:text-base mt-4">
                • Must be level{" "}
                <span className="text-destructive">
                  {req.task.minPlayerLevel}
                </span>{" "}
                to start this quest.{" "}
              </li>
            ))}
            {taskData.taskRequirements.map((req) => (
              <li key={req.task.id} className="text-sm md:text-base ">
                • Must complete -{" "}
                <span className="text-chart-2 hover:text-foreground/80 ">
                  <Link href={`/task/${req.task.id}`}>{req.task.name}</Link>
                </span>
                .
              </li>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <p className="italic text-gray-400">None</p>
      )}
    </>
  );
};

export default TaskRequirements;
