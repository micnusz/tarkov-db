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
import Link from "next/link";
import Loading from "./loading";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Briefcase, TowerControl } from "lucide-react";
import formatCurrency from "@/components/modules/currency-format";
import traderStandingFormat from "@/components/modules/trader-standing-format";
import ExperienceReward from "@/components/task-rewards/ExperienceReward";
import { SkillLevelReward } from "@/components/task-rewards/SkillLevelReward";
import TraderStandingReward from "@/components/task-rewards/TraderStandingReward";
import ItemReward from "@/components/task-rewards/ItemReward";
import TraderUnlockReward from "@/components/task-rewards/TraderUnlockReward";
import BarterUnlockReward from "@/components/task-rewards/BarterUnlockReward";
import PurchaseRewardUnlock from "@/components/task-rewards/PurchaseUnlockReward";

type TaskPageClientProps = {
  id: string;
};

const TaskPageClient = ({ id }: TaskPageClientProps) => {
  const { data: taskData } = useQuery({
    queryKey: ["task", id],
    queryFn: () => client.getTask(id),
    enabled: !!id,
  });
  if (!taskData) {
    return <Loading />;
  }

  return (
    <div key={taskData.id} className="flex flex-col p-10">
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div>
            <h1 className="text-left text-4xl font-extrabold tracking-tight">
              {taskData.name}
            </h1>
            <div className="mt-2 flex flex-col text-sm md:text-base gap-1">
              <p className="">Given by: {taskData.trader.name}</p>
              {taskData.map ? (
                <p>Location: {taskData.map?.name}</p>
              ) : (
                <p>
                  Location: <span className="text-gray-400">Any</span>
                </p>
              )}
              <div className="flex flex-row gap-3 items-center">
                <span>Required for:</span>

                {!taskData.kappaRequired && !taskData.lightkeeperRequired ? (
                  <p className="text-gray-400 italic">
                    Not required for Kappa or Lightkeeper
                  </p>
                ) : (
                  <>
                    {taskData.kappaRequired && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Briefcase
                            className="w-5 h-5 object-contain"
                            aria-label="Icon of kappa container"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Required for Kappa</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {taskData.lightkeeperRequired && (
                      <Tooltip>
                        <TooltipTrigger>
                          <TowerControl
                            className="w-5 h-5 object-contain"
                            aria-label="Icon of lighthouse"
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
          >
            Wiki
          </a>
        </div>

        <div className="flex justify-center items-center md:w-1/2">
          <div className="relative inline-block">
            <img
              src={taskData.taskImageLink}
              alt={taskData.name}
              className="min-w-[150px] max-w-[300px] object-contain"
            />

            <div className="absolute top-1 left-1">
              <Badge
                variant="default"
                className="flex items-center gap-2 px-1 py-1 text-sm shadow-md bg-chart-1"
              >
                <img
                  aria-label={`Icon of trader: ${taskData.trader.name}`}
                  src={taskData.trader.imageLink}
                  alt={taskData.trader.name}
                  className="w-6 h-6 object-contain"
                />
                {taskData.trader.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">Requirements:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {taskData.taskRequirements.length > 0 ? (
              <ScrollArea className="rounded-md border">
                <ul>
                  {taskData.taskRequirements ? (
                    <li className="text-sm md:text-base mt-4">
                      • Must be level{" "}
                      <span className="text-destructive">
                        {taskData.minPlayerLevel}
                      </span>{" "}
                      to start this quest.{" "}
                    </li>
                  ) : null}
                  {taskData.taskRequirements.map((req) => (
                    <li key={req.task.id} className="text-sm md:text-base ">
                      • Must complete -{" "}
                      <span className="text-chart-2 hover:text-foreground/80 ">
                        <Link href={`/task/${req.task.id}`}>
                          {req.task.name}
                        </Link>
                      </span>
                      .
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="italic text-gray-400">None</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Objectives:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
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
          </AccordionContent>
        </AccordionItem>
        {taskData.startRewards?.items &&
        taskData.startRewards?.items.length > 0 ? (
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">
              Initial Equipment:
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
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
            </AccordionContent>
          </AccordionItem>
        ) : null}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg">Rewards:</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ScrollArea className="rounded-md border">
              {taskData.finishRewards.items &&
              taskData.finishRewards.items.length > 0 ? (
                <ul className="p-2">
                  <ExperienceReward experience={taskData.experience} />
                  <SkillLevelReward
                    skillLevelReward={taskData.finishRewards.skillLevelReward}
                  />
                  <TraderStandingReward
                    traderStanding={taskData.finishRewards.traderStanding}
                  />
                  <ItemReward items={taskData.finishRewards.items} />
                  <TraderUnlockReward
                    traderUnlock={taskData.finishRewards.traderUnlock}
                  />
                  <BarterUnlockReward
                    offerUnlock={taskData.finishRewards.offerUnlock}
                  />
                  <PurchaseRewardUnlock
                    offerUnlock={taskData.finishRewards.offerUnlock}
                  />
                </ul>
              ) : (
                <p className="italic text-gray-400">No rewards</p>
              )}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        {taskData.failureOutcome?.traderStanding &&
        taskData.failureOutcome?.traderStanding?.length > 0 ? (
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">
              Failure Penalty:
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ScrollArea className="rounded-md border">
                <ul className="p-2">
                  {taskData.failureOutcome?.traderStanding?.map((failure) => (
                    <li
                      key={failure.trader.id}
                      className="text-sm md:text-base"
                      aria-label={`Trader standing penalty: ${failure.standing}`}
                    >
                      • {traderStandingFormat(failure.standing)}{" "}
                      {failure.trader.name} Rep
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </div>
  );
};

export default TaskPageClient;
