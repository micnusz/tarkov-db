import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-1 flex-1">
      <div className="flex flex-col flex-wrap px-6 md:px-20 mb-2">
        <Skeleton className="w-1/2 md:w-1/4 h-[3rem] px-2 mb-2" />
        <Skeleton className="w-1/3 md:w-1/5 h-[3rem] px-2 mb-2" />
        <Skeleton className="w-full md:w-1/2 h-[30rem] px-2 mb-2" />
      </div>
      <div className="flex flex-col flex-wrap px-6 md:px-20">
        <Skeleton className="md:w-full h-[3rem] px-2 mb-2" />
        <Skeleton className="md:w-full h-[3rem] px-2 mb-2" />
        <Skeleton className="md:w-full h-[3rem] px-2 mb-2" />
      </div>
    </div>
  );
}
