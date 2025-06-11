"use client";

import { client } from "@/app/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTableTasks } from "./data-table/data-table-tasks";
import { useMemo } from "react";
import { Briefcase, TowerControl } from "lucide-react";
import DefaultHeader from "./ui/default-header";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Task } from "@/app/api/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const TasksClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => client.getTasks(),
  });

  const columnHelper = createColumnHelper<Task>();
  const columns: ColumnDef<Task>[] = useMemo(
    () => [
      columnHelper.accessor((row) => row.trader.name, {
        id: "trader",
        filterFn: "equals",
        header: (info) => <DefaultHeader info={info} name="Trader" />,
        cell: (info) => {
          const name = info.getValue();
          const row = info.row.original;

          return (
            <div className="flex items-center gap-2 flex-wrap max-w-full">
              <img
                aria-label={`Image of trader: ${name}`}
                src={row.trader.imageLink}
                alt={name}
                className="w-16 object-contain"
              />
            </div>
          );
        },
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        filterFn: "includesString",
        header: (info) => <DefaultHeader info={info} name="Task" />,
        cell: (info) => {
          const name = info.getValue();
          const row = info.row.original;
          const taskId = row.id;

          return (
            <div className="flex items-center gap-2 flex-wrap max-w-full">
              <Link href={`/task/${taskId}`}>
                <span className="text-sm font-medium break-words whitespace-normal text-chart-2 hover:text-foreground/80  ">
                  {name}
                </span>
              </Link>
            </div>
          );
        },
      }),
      columnHelper.accessor((row) => row.taskRequirements, {
        id: "taskRequirements",
        header: (info) => <DefaultHeader info={info} name="Required tasks" />,
        cell: (info) => {
          const requirements = info.getValue();
          return requirements && requirements.length > 0 ? (
            <div className="flex flex-col gap-1 justify-center">
              {requirements.map((req) => (
                <span
                  key={req.task.id}
                  className="text-sm text-chart-2 hover:text-foreground/80"
                >
                  <Link href={`/task/${req.task.id}`}>{req.task.name}</Link>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 italic">None</span>
          );
        },
      }),
      columnHelper.accessor("minPlayerLevel", {
        id: "minPlayerLevel",
        header: (info) => <DefaultHeader info={info} name="Min. Level" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("map.name", {
        id: "map.name",
        filterFn: "equals",
        header: (info) => <DefaultHeader info={info} name="Map" />,
        cell: (info) => {
          const mapName = info.getValue();
          return mapName ? (
            <span className="text-sm">{mapName}</span>
          ) : (
            <span className="text-gray-400 italic">Any</span>
          );
        },
      }),
      columnHelper.accessor(
        (row) => ({
          kappa: row.kappaRequired,
          lightkeeper: row.lightkeeperRequired,
        }),
        {
          id: "requirements",
          header: (info) => <DefaultHeader info={info} name="Required for" />,
          cell: (info) => {
            const { kappa, lightkeeper } = info.getValue();
            const hasAny = kappa || lightkeeper;

            return hasAny ? (
              <div className="flex items-center gap-2 justify-center">
                {kappa && (
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
                {lightkeeper && (
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
              </div>
            ) : (
              <div className="flex justify-center">
                <span className="text-gray-400 italic ">Not Required</span>
              </div>
            );
          },
        }
      ),
    ],
    []
  );

  return (
    <div className="w-full h-full flex-col justify-center items-center p-10">
      <DataTableTasks data={data} columns={columns} />
    </div>
  );
};

export default TasksClient;
