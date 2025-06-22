import { client } from "@/app/api/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  taskId: string;
};

const TaskObjectives = ({ taskId }: Props) => {
  const { data: taskData } = useSuspenseQuery({
    queryKey: ["task-objectives", taskId],
    queryFn: () => client.getTaskIdObjectives(taskId),
  });

  return (
    <>
      {taskData.objectives.length > 0 ? (
        <ScrollArea className=" rounded-md border">
          <ul>
            {taskData.objectives.map((obj) => (
              <li key={obj.id} className="text-sm md:text-base">
                • {obj.description}
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

export default TaskObjectives;
