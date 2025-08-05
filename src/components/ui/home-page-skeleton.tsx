"use client";

import { Skeleton } from "./skeleton";

const HomePageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-col justify-center items-center p-4 md:p-10">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4  p-4">
            <Skeleton />
            <Skeleton />
          </div>
          <div className="flex flex-col md:p-4 gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 sm:w-screen min-w-[15rem] md:min-w-[18rem]">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePageSkeleton;
