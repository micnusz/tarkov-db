import { Skeleton } from "./skeleton";

export default function SearchBarLoading() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Skeleton className="h-[2rem] w-full rounded-md border" />
      <Skeleton className="h-[2rem] w-full rounded-md border" />
      <Skeleton className="h-[2rem] w-full rounded-md border" />
    </div>
  );
}
