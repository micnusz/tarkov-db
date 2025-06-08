import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "./skeleton";

type ItemsSkeletonProps = {
  categoryCount: number;
};

const ItemsSkeleton = ({ categoryCount }: ItemsSkeletonProps) => {
  return (
    <div className={cn("max-w-6xl mx-auto py-10 px-4")}>
      <div className="flex flex-wrap -mx-2">
        {categoryCount > 0
          ? Array.from({ length: categoryCount }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ItemsSkeleton;
