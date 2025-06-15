"use client";

import { client } from "@/app/api/client";
import { useQuery } from "@tanstack/react-query";
import { DataTableFleaMarket } from "./data-table/data-table-flea";
import { columnsFlea } from "./data-table/columns";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

const FleaMarketClient = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

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
  const { data, isLoading } = useQuery({
    queryKey: ["items", offset, limit, debouncedName],
    queryFn: () => client.getItems(limit, offset, debouncedName || undefined),
  });
  //Filtering items to only displaying flea available ones
  const fleaItems = data?.filter((item) =>
    item.buyFor?.some((offer) => offer.vendor.name === "Flea Market")
  );

  return (
    <div className="w-full h-full flex-col justify-center items-center p-4 md:p-10">
      <DataTableFleaMarket
        data={fleaItems ?? []}
        columns={columnsFlea}
        pagination={pagination}
        setPagination={setPagination}
        name={name}
        setName={setName}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FleaMarketClient;
