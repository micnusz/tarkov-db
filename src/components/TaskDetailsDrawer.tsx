"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Task } from "@/app/api/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type TaskDetailsDrawerProps = {
  data: Task | null;
  open: boolean;
  onClose: () => void;
};

export default function TaskDetailsDrawer({
  data: task,
  open,
  onClose,
}: TaskDetailsDrawerProps) {
  if (!task) return null;

  const skillReward = task.finishRewards.skillLevelReward;

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="p-6 text-base md:text-lg">
        <div className="w-full mx-auto">
          <DrawerHeader className="mb-6">
            <DrawerTitle className="text-2xl md:text-3xl font-bold ">
              {task.name}
            </DrawerTitle>
          </DrawerHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:px-6 pb-6">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <img
                  src={task.taskImageLink}
                  alt={task.name}
                  className="rounded-md"
                />

                <div className="absolute top-1 left-1">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 px-2 py-1 text-sm shadow-md"
                  >
                    <img
                      src={task.trader.imageLink}
                      alt={task.trader.name}
                      className="w-6 h-6 object-contain"
                    />
                    {task.trader.name}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Map</h3>
                <p className="mt-1 text-sm md:text-base">
                  {task.map?.name || (
                    <span className="italic text-gray-400">Any</span>
                  )}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Minimum Level</h3>
                <p className="mt-1 text-sm md:text-base">
                  {task.minPlayerLevel || (
                    <span className="italic text-gray-400">None</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                {task.objectives.length > 0 ? (
                  <ul className="flex flex-col gap-1">
                    {task.objectives.map((obj) => (
                      <li
                        key={obj.id}
                        className={`text-sm md:text-base ${
                          obj.optional ? "text-gray-400 italic" : ""
                        }`}
                      >
                        • {obj.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="italic text-gray-400">None</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Rewards</h3>
                {task.finishRewards.items.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {task.finishRewards.items.map((reward) => (
                      <div
                        key={reward.item.id}
                        className="text-sm md:text-base"
                      >
                        • {reward.item.name}: {reward.count}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="italic text-gray-400">No rewards</p>
                )}

                {skillReward?.name && skillReward?.level ? (
                  <div className="text-sm md:text-base mt-4">
                    • 🧠 {skillReward.name} level {skillReward.level}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <DrawerFooter className="flex justify-center mb-6">
            <DrawerClose asChild>
              <Button variant="outline" className="w-32">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
