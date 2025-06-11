import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-1 flex-1 p-10">
      <div className="flex flex-col flex-wrap  mb-2">
        <Skeleton className="w-1/2 md:w-1/3 h-[3rem] px-2 mb-2" />
        <Skeleton className="w-1/3 md:w-1/5 h-[3rem] px-2 mb-2" />
        <div className="flex  flex-row gap-4">
          <Skeleton className="w-full md:w-1/2 h-[30rem] px-2 mb-2" />
          <Skeleton className="hidden md:block md:w-1/2 h-[30rem] px-2 mb-2" />
        </div>
      </div>
      <div className="flex flex-col flex-wrap ">
        <Skeleton className="md:w-full h-[3rem] px-2 mb-3" />
        <Skeleton className="md:w-full h-[3rem] px-2 mb-3" />
        <Skeleton className="md:w-full h-[3rem] px-2 mb-3" />
        <Skeleton className="md:w-full h-[3rem] px-2 mb-3" />
      </div>
    </div>
  );
}
