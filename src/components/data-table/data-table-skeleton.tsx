import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
  columnCount: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withPagination?: boolean;
  shrinkZero?: boolean;
  searchCount?: number;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 20,
  searchCount = 1,
  filterCount = 0,
  cellWidths = ["auto"],
  withPagination = true,
  shrinkZero = false,
  className,
  ...props
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto"
  );

  return (
    <div
      className={cn(
        " w-full h-full flex-col justify-center items-center p-4 md:p-12 my-10 ",
        className
      )}
      {...props}
    >
      <div className="w-full items-center justify-between overflow-auto ">
        <div className="flex flex-row flex-1 items-center mb-4">
          {searchCount > 0
            ? Array.from({ length: searchCount }).map((_, i) => (
                <div key={i} className="flex flex-row gap-x-2">
                  <Skeleton className="h-[2rem] w-full md:w-[20rem] border-dashed mb-2" />
                  <Skeleton className="h-[2rem] w-full md:w-[5rem] border-dashed mb-2" />
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 overflow-auto ">
        <div className="flex flex-1 items-center gap-2">
          {filterCount > 0
            ? Array.from({ length: filterCount }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-screen h-[2rem] w-[8rem] md:w-[10rem] border-dashed mb-2"
                />
              ))
            : null}
        </div>
      </div>
      <div className="">
        {/* Desktop view (md and up) */}
        <div className="hidden md:block">
          <Table>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <TableCell
                      key={j}
                      style={{
                        width: cozyCellWidths[j],
                        minWidth: shrinkZero ? cozyCellWidths[j] : "auto",
                      }}
                    >
                      <Skeleton className="h-16 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view (sm and down) */}
        <div className="md:hidden space-y-4 w-full">
          {Array.from({ length: rowCount }).map((_, i) => (
            <div key={i} className="border rounded-md p-4 shadow-sm space-y-2">
              {Array.from({ length: columnCount }).map((_, j) => (
                <div key={j}>
                  <Skeleton className="h-16 w-full mb-1" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {withPagination ? (
        <div className="flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-[4.5rem]" />
            </div>
            <div className="flex items-center justify-center font-medium text-sm">
              <Skeleton className="h-16 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="hidden size-7 lg:block" />
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
              <Skeleton className="hidden size-7 lg:block" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
