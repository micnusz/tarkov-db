import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

type PopoverFilterProps<T extends string | number> = {
  label: string;
  value: T | null;
  onChange: (val: T | null) => void;
  options: T[];
  formatter?: (val: T) => string;
  showClear?: boolean;
  keyExtractor?: (val: T) => string | number;
};

function PopoverFilter<T extends string | number>({
  label,
  value,
  onChange,
  options,
  formatter = (val) => String(val),
  showClear = true,
  keyExtractor = (val) => String(val),
}: PopoverFilterProps<T>) {
  const [open, setOpen] = useState(false);

  const formattedValue = value !== null ? formatter(value) : "Any";

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={value ? "default" : "outline"}
          className="justify-between "
        >
          {label}: {formattedValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" rounded-lg shadow-md">
        <Command>
          <ScrollArea className="max-h-[20rem] md:max-h-[30rem] overflow-y-auto">
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value === option;

                return (
                  <CommandItem
                    key={keyExtractor(option)}
                    onSelect={() => {
                      if (value === option) {
                        onChange(null);
                      } else {
                        onChange(option);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {formatter(option)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>

        {showClear && (
          <div className="border-t p-2">
            <Button
              className="w-full text-foreground hover:text-foreground/60"
              variant={value ? "destructive" : "muted"}
              size="sm"
              disabled={!value}
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverFilter;
