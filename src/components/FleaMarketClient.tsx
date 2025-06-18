"use client";

import { client } from "@/app/api/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DataTableFleaMarket } from "./data-table/data-table-flea";
import { columnsFlea } from "./data-table/columns";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { BaseItem } from "@/app/api/types";
import { DataTablePagination } from "./data-table/data-table-pagination";
import Spinner from "@/lib/Spinner";

const FleaMarketClient = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [], isLoading: isLoadingCat } = useQuery({
    queryKey: ["items-categories"],
    queryFn: () => client.getItemCategories(),
  });

  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;

  // debounce setup
  const debouncedSetName = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedName(value);
      }, 300),
    []
  );

  // debounce effect
  useEffect(() => {
    debouncedSetName(name);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    return () => {
      debouncedSetName.cancel();
    };
  }, [name, debouncedSetName]);

  // react-query with debouncedName
  const { data = [], isLoading } = useQuery<BaseItem[], Error>({
    queryKey: ["items", offset, limit, debouncedName, selectedCategory],
    queryFn: () =>
      client.getItems(
        limit,
        offset,
        debouncedName || undefined,
        selectedCategory ? [selectedCategory] : undefined
      ),
    staleTime: 5 * 60 * 1000,
  });

  //Filtering items to only displaying flea available ones
  const fleaItems = data?.filter((item) =>
    item.buyFor?.some((offer) => offer.vendor.name === "Flea Market")
  );

  //Pagination
  const totalCount = 3980;
  const pageCount = Math.ceil(totalCount / pagination.pageSize);

  function handlePageChange(newPageIndex: number) {
    if (newPageIndex < 0 || newPageIndex >= pageCount) return;
    setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
  }

  function handlePageSizeChange(newPageSize: number) {
    setPagination({ pageIndex: 0, pageSize: newPageSize });
  }

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Flea Market
      </h1>
      <DataTableFleaMarket
        data={fleaItems ?? []}
        columns={columnsFlea}
        name={name}
        setName={setName}
        categories={categories ?? []}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isLoadingCat={isLoadingCat}
        isLoading={isLoading}
      />
      <DataTablePagination
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        canPreviousPage={pagination.pageIndex > 0}
        canNextPage={pagination.pageIndex + 1 < pageCount}
      />
    </div>
  );
};

export default FleaMarketClient;
