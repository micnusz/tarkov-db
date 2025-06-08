"use client";
import { client } from "@/app/api/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [queryText, setQueryText] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSetQueryText = useMemo(
    () =>
      debounce((text: string) => {
        setQueryText(text);
      }, 300),
    []
  );
  useEffect(() => {
    debouncedSetQueryText(search);
    // cleanup debounce
    return () => {
      debouncedSetQueryText.cancel();
    };
  }, [search, debouncedSetQueryText]);

  const { data, isLoading } = useQuery({
    queryKey: ["items", queryText],
    queryFn: () => client.getItemsSearchBar(queryText),
    enabled: queryText.trim().length > 0,
    staleTime: 0,
    gcTime: 60 * 1000,
  });

  useEffect(() => {
    debouncedSetQueryText(search);
  }, [search]);
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);

          if (!isOpen) {
            setSearch("");
          }
        }}
      >
        <DialogTrigger asChild>
          <div className="w-[10rem] md:w-[20rem] duration-200 ease-in-out max-w-sm rounded-md border-3 border-input bg-muted/20 px-3 py-2 text-sm text-muted-foreground shadow-sm cursor-pointer transition-colors hover:border-chart-1 hover:text-foreground ">
            Search
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-4 border rounded mb-2"
            />

            <DialogTitle hidden={true}>Search Items</DialogTitle>
            <DialogDescription asChild>
              <ScrollArea className="h-[25rem] w-full rounded-md border">
                <div>
                  {data?.map((item) => (
                    <React.Fragment key={item.id}>
                      <Link
                        href={`/item/${item.id}`}
                        onClick={() => setOpen(false)}
                      >
                        <p className="text-lg">{item.name}</p>
                      </Link>
                      <Separator className="my-2" />
                    </React.Fragment>
                  ))}
                </div>
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
