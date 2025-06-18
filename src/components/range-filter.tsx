import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type RangeFilterProps = {
  label: string;
  value: { min: number | null; max: number | null };
  onChange: (val: { min: number | null; max: number | null }) => void;
  min?: number;
  max?: number;
  formatter?: (value: { min: number | null; max: number | null }) => string;
  showClear?: boolean;
};

const RangeFilter = ({
  label,
  value,
  onChange,
  min,
  max,
  formatter,
  showClear = true,
}: RangeFilterProps) => {
  const [open, setOpen] = useState(false);

  const formattedValue =
    value.min === null && value.max === null
      ? "Any"
      : `${
          value.min !== null
            ? formatter
              ? formatter(value.min)
              : value.min
            : ""
        }${value.min !== null && value.max !== null ? " – " : ""}${
          value.max !== null
            ? formatter
              ? formatter(value.max)
              : value.max
            : ""
        }`;

  const handleClear = () => {
    onChange({ min: null, max: null });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={
            value.min !== null || value.max !== null ? "default" : "outline"
          }
          className="justify-between"
        >
          {label}: {formattedValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-lg shadow-md p-4 w-[280px]">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              placeholder="Min"
              value={value.min ?? ""}
              min={min}
              max={max}
              onChange={(e) =>
                onChange({
                  min: e.target.value === "" ? null : Number(e.target.value),
                  max: value.max,
                })
              }
              className="w-24"
            />
            <Input
              type="number"
              placeholder="Max"
              value={value.max ?? ""}
              min={min}
              max={max}
              onChange={(e) =>
                onChange({
                  min: value.min,
                  max: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className="w-24"
            />
          </div>

          <Button
            className="mb-2"
            variant="secondary"
            size="sm"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RangeFilter;
