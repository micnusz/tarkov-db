import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PaginationControls = ({ table }: { table: any }) => {
  const currentPage = table.getState().pagination.pageIndex; // 0-based
  const totalPages = table.getPageCount();

  const getVisiblePages = () => {
    if (currentPage === 0) return [0];
    return [currentPage - 1, currentPage, currentPage + 1].filter(
      (p) => p >= 0 && p < totalPages
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="m-3 flex justify-center items-center gap-2">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="p-2"
      >
        <ChevronLeft />
      </Button>

      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => table.setPageIndex(page)}
          className={` py-1  ${
            page === currentPage
              ? "bg-red-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {page + 1}
        </Button>
      ))}

      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="p-2"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
