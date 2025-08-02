"use client";
import { client } from "@/app/api/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";
import Link from "next/link";
import SearchBarLoading from "./ui/search-bar-loading";
import { X } from "lucide-react";

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
    queryKey: ["items-global-search", queryText],
    queryFn: () => client.getItemsSearchBar(queryText),
    enabled: queryText.trim().length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 60 * 1000,
  });

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
          <div className="flex flex-grow flex-shrink max-w-60 md:w-60 duration-200 ease-in-out rounded-md border-3 border-input bg-accent px-3 py-1 text-sm text-muted-foreground shadow-sm cursor-pointer transition-colors hover:border-chart-1 hover:text-foreground ">
            <span>Search (Global)</span>
          </div>
        </DialogTrigger>
        <DialogContent className="border-foreground/20">
          <DialogTitle asChild>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Search by:</span>
              <DialogClose
                className="rounded-md hover:bg-accent transition hover:text-muted-foreground"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogHeader>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex flex-grow flex-shrink  duration-200 ease-in-out rounded-md border-3 border-input bg-accent px-3 py-1 text-sm text-muted-foreground shadow-sm  transition-colors hover:border-chart-1 hover:text-foreground "
            />
            <DialogTitle hidden={true}>Search Items</DialogTitle>
            <DialogDescription asChild className="h-[20rem]">
              <ScrollArea className="w-full rounded-md border p-2">
                <>
                  {isLoading && <SearchBarLoading />}
                  {data?.map((item) => (
                    <React.Fragment key={item.id}>
                      <Link
                        href={`/item/${item.id}`}
                        onClick={() => setOpen(false)}
                      >
                        <p className="text-lg hover:text-chart-2">
                          {item.name}
                        </p>
                      </Link>
                      <Separator className="my-2" />
                    </React.Fragment>
                  ))}
                </>
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
