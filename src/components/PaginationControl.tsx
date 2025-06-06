import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PaginationControls = ({ table }: { table: any }) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="flex flex-row gap-2 justify-center">
        <Button onClick={() => table.previousPage()}>
          <ChevronLeft />
        </Button>
        <Button onClick={() => table.nextPage()}>
          <ChevronRight />
        </Button>
      </div>
      <span className="text-sm text-gray-600">
        Page: {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
    </div>
  );
};
