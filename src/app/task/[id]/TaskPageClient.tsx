"use client";
import { client } from "@/app/api/client";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "./loading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Briefcase, TowerControl } from "lucide-react";
import { lazy, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Spinner from "@/lib/Spinner";

type TaskPageClientProps = {
  id: string;
};

const TaskPageClient = ({ id }: TaskPageClientProps) => {
  const { data: taskData } = useQuery({
    queryKey: ["task", id],
    queryFn: () => client.getTaskIdBase(id),
    enabled: !!id,
  });
  if (taskData === undefined) return <Loading />;
  if (taskData === null) return <div>Task not found.</div>;

  const TaskRequirements = lazy(
    () =>
      import(
        "@/components/dynamic-import/task-rewards/dynamic-import/TaskRequirements"
      )
  );
  const TaskObjectives = lazy(
    () =>
      import(
        "@/components/dynamic-import/task-rewards/dynamic-import/TaskObjectives"
      )
  );
  const TaskStartRewards = lazy(
    () =>
      import(
        "@/components/dynamic-import/task-rewards/dynamic-import/TaskStartRewards"
      )
  );
  const TaskFinishRewards = lazy(
    () =>
      import(
        "@/components/dynamic-import/task-rewards/dynamic-import/TaskFinishRewards"
      )
  );
  const TaskFailure = lazy(
    () =>
      import(
        "@/components/dynamic-import/task-rewards/dynamic-import/TaskFailure"
      )
  );

  return (
    <div
      key={taskData.id}
      role="region"
      aria-labelledby="task-title"
      className="flex flex-col p-4 md:p-10"
    >
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div>
            <h1
              className="text-left text-4xl font-extrabold tracking-tight"
              id="task-title"
            >
              {taskData?.name}
            </h1>
            <div className="mt-2 flex flex-col text-sm md:text-base gap-1">
              <p aria-label={`Task given by ${taskData.trader?.name}`}>
                Given by: {taskData.trader?.name}
              </p>
              {taskData.map ? (
                <p>Location: {taskData.map?.name}</p>
              ) : (
                <p>
                  Location: <span className="text-gray-400">Any</span>
                </p>
              )}
              <div
                className="flex flex-row gap-3 items-center"
                role="group"
                aria-label="Required for"
              >
                <span>Required for:</span>

                {!taskData.kappaRequired && !taskData.lightkeeperRequired ? (
                  <p className="text-gray-400 italic">
                    Not required for Kappa or Lightkeeper
                  </p>
                ) : (
                  <>
                    {taskData.kappaRequired && (
                      <Tooltip>
                        <TooltipTrigger aria-label="Required for Kappa">
                          <Briefcase
                            className="w-5 h-5 object-contain"
                            aria-hidden="true"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Required for Kappa</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {taskData.lightkeeperRequired && (
                      <Tooltip>
                        <TooltipTrigger aria-label="Required for Lightkeeper">
                          <TowerControl
                            className="w-5 h-5 object-contain"
                            aria-hidden="true"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Required for Lightkeeper</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <a
            href={taskData.wikiLink}
            className="text-chart-2 hover:text-foreground/80 mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open task wiki in a new tab"
          >
            Wiki
          </a>
        </div>

        <div className="flex justify-center items-center md:w-1/2">
          <div className="relative inline-block">
            <Image
              aria-label={`Image of task: ${taskData.name}`}
              src={taskData.taskImageLink}
              alt={`Image of task: ${taskData.name}`}
              width={300}
              height={300}
              className="object-contain"
            />

            <div className="absolute top-1 left-1">
              <Badge
                variant="default"
                className="flex items-center gap-2 px-1 py-1 text-sm shadow-md bg-chart-1"
                role="img"
                aria-label={`Badge with trader ${taskData.trader.name}`}
              >
                <Image
                  aria-label={`Icon of trader: ${taskData.trader.name}`}
                  src={taskData.trader.imageLink}
                  alt={`Trader icon: ${taskData.trader.name}`}
                  width={30}
                  height={30}
                  className="object-contain"
                />
                {taskData.trader.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="requirements">
          <AccordionTrigger
            className="text-lg"
            id="requirements-trigger"
            aria-controls="requirements-content"
          >
            Requirements:
          </AccordionTrigger>
          <AccordionContent
            className="flex flex-col gap-4 text-balance"
            id="requirements-content"
            aria-labelledby="requirements-trigger"
            role="region"
          >
            <Suspense fallback={<Spinner />}>
              <TaskRequirements taskId={taskData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="objectives">
          <AccordionTrigger
            className="text-lg"
            id="objectives-trigger"
            aria-controls="objectives-content"
          >
            Objectives:
          </AccordionTrigger>
          <AccordionContent
            className="flex flex-col gap-4 text-balance"
            id="objectives-content"
            aria-labelledby="objectives-trigger"
            role="region"
          >
            <Suspense fallback={<Spinner />}>
              <TaskObjectives taskId={taskData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="initial-equipment">
          <AccordionTrigger
            className="text-lg"
            id="initial-equipment-trigger"
            aria-controls="initial-equipment-content"
          >
            Initial Equipment:
          </AccordionTrigger>
          <AccordionContent
            className="flex flex-col gap-4 text-balance"
            id="initial-equipment-content"
            aria-labelledby="initial-equipment-trigger"
            role="region"
          >
            <Suspense fallback={<Spinner />}>
              <TaskStartRewards taskId={taskData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rewards">
          <AccordionTrigger
            className="text-lg"
            id="rewards-trigger"
            aria-controls="rewards-content"
          >
            Rewards:
          </AccordionTrigger>
          <AccordionContent
            className="flex flex-col gap-4 text-balance"
            id="rewards-content"
            aria-labelledby="rewards-trigger"
            role="region"
          >
            <ScrollArea className="rounded-md border">
              <Suspense fallback={<Spinner />}>
                <TaskFinishRewards
                  taskId={taskData.id}
                  experience={taskData.experience}
                />
              </Suspense>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="failure-penalty">
          <AccordionTrigger
            className="text-lg"
            id="failure-penalty-trigger"
            aria-controls="failure-penalty-content"
          >
            Failure Penalty:
          </AccordionTrigger>
          <AccordionContent
            className="flex flex-col gap-4 text-balance"
            id="failure-penalty-content"
            aria-labelledby="failure-penalty-trigger"
            role="region"
          >
            <Suspense fallback={<Spinner />}>
              <TaskFailure taskId={taskData.id} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TaskPageClient;
