import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SliderFilterComboboxProps {
  label: string;
  value: number | null;
  onChange: (val: number | null) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showClear?: boolean;
  formatter?: (val: number) => string;
}

export function SliderFilterCombobox({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  showClear = true,
  formatter,
}: SliderFilterComboboxProps) {
  const [open, setOpen] = useState(false);

  const formattedValue =
    value !== null ? (formatter ? formatter(value) : `${value}${unit}`) : "Any";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          {label}: {formattedValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] bg-accent">
        <div className="flex flex-col gap-4 p-2">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value !== null ? [value] : undefined}
            onValueChange={(val) => onChange(val[0])}
            className="w-full"
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Selected: {formattedValue}</span>
            {showClear && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onChange(null)}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
