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
import formatExperience from "@/components/modules/experience-format";

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

          {taskData.description ? (
            <p className="leading-7 mt-2">{taskData.description}</p>
          ) : (
            <p className="leading-7 mt-2">No Description...</p>
          )}

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
                      <Link href={`/task/${req.task.id}`}>
                        • Must complete -{" "}
                        <span className="text-chart-2 hover:text-foreground/80 ">
                          {req.task.name}
                        </span>
                        .
                      </Link>
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
                    <li
                      key={obj.id}
                      className={`text-sm md:text-base} ${
                        obj.optional ? "text-gray-400 italic" : ""
                      }`}
                    >
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
        {taskData.startRewards.items.length > 0 ? (
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
            {taskData.finishRewards.items.length > 0 ? (
              <ScrollArea className="rounded-md border">
                <ul className="p-2">
                  {/* EXP Reward */}
                  {taskData.experience > 0 && (
                    <li className="text-sm md:text-base">
                      • +{formatExperience(taskData.experience)}.
                    </li>
                  )}
                  {/* Skill level Reward */}
                  {taskData.finishRewards.skillLevelReward?.length > 0 && (
                    <>
                      {taskData.finishRewards.skillLevelReward.map((skill) => (
                        <li
                          key={skill.name}
                          className="text-sm md:text-base"
                          aria-label={`Reward: ${skill.name} level ${skill.level}`}
                        >
                          • +{skill.level} {skill.name} skill level
                        </li>
                      ))}
                    </>
                  )}
                  {/* Items Rewards */}
                  {taskData.finishRewards.items.map((reward) => (
                    <li key={reward.item.id} className="text-md md:text-base ">
                      <Link
                        href={`/item/${reward.item.id}`}
                        prefetch={false}
                        aria-label={`Go to item page for ${reward.item.name}`}
                      >
                        • {formatCurrency(reward.item.name, reward.count)} x{" "}
                        <span className="text-chart-2 hover:text-foreground/80">
                          {reward.item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                  {/* Trader Unlocks */}
                  {taskData.finishRewards.traderUnlock?.length > 0 && (
                    <>
                      {taskData.finishRewards.traderUnlock.map((trader) => (
                        <li key={trader.id}>
                          • Unlocks {trader.name} as a trader.
                        </li>
                      ))}
                    </>
                  )}
                  {/* Barter Unlocks */}
                  {taskData.finishRewards.offerUnlock?.length > 0 && (
                    <>
                      {taskData.finishRewards.offerUnlock.map((offer) => {
                        const isBarter = offer.item.bartersFor?.some(
                          (barter) => barter.trader?.name === offer.trader.name
                        );

                        return (
                          isBarter && (
                            <li
                              key={`barter-${offer.item.id}-${offer.trader.id}-${offer.level}`}
                              aria-label={`Unlocks barter for ${offer.item.name}`}
                            >
                              • Unlocks barter for{" "}
                              <Link
                                href={`/item/${offer.item.id}`}
                                aria-label={`Go to item page for ${offer.item.name}`}
                              >
                                <span className="text-chart-2 hover:text-foreground/80">
                                  {offer.item.name}
                                </span>
                              </Link>{" "}
                              at {offer.trader.name} LL {offer.level}.
                            </li>
                          )
                        );
                      })}
                    </>
                  )}
                  {/* Purchase Unlocks */}
                  {taskData.finishRewards.offerUnlock?.length > 0 && (
                    <>
                      {taskData.finishRewards.offerUnlock.map((offer) => {
                        const isPurchase = offer.item.buyFor?.some(
                          (buy) => buy.vendor?.name === offer.trader.name
                        );

                        return (
                          isPurchase && (
                            <li
                              key={`purchase-${offer.item.id}-${offer.trader.id}-${offer.level}`}
                              aria-label={`Unlocks purchase of ${offer.item.name}`}
                            >
                              • Unlocks purchase of{" "}
                              <Link
                                href={`/item/${offer.item.id}`}
                                aria-label={`Go to item page for ${offer.item.name}`}
                              >
                                <span className="text-chart-2 hover:text-foreground/80">
                                  {offer.item.name}
                                </span>
                              </Link>{" "}
                              at {offer.trader.name} LL {offer.level}.
                            </li>
                          )
                        );
                      })}
                    </>
                  )}
                </ul>
              </ScrollArea>
            ) : (
              <p className="italic text-gray-400">No rewards</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TaskPageClient;
