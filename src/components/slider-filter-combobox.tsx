import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { UniversalNumberFormatFnValue } from "./modules/universal-number-format-fn";

interface SliderFilterComboboxProps {
  label: string;
  value: UniversalNumberFormatFnValue;
  onChange: (val: UniversalNumberFormatFnValue) => void;
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

  const display =
    value.min != null && value.max != null
      ? `${formatter ? formatter(value.min) : value.min}${unit} - ${
          formatter ? formatter(value.max) : value.max
        }${unit}`
      : "Any";

  const isRangeSelected = value.min != null && value.max != null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isRangeSelected ? "secondary" : "outline"}
          className="justify-between"
        >
          {label}: {display}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] bg-accent">
        <div className="flex flex-col gap-4 p-2">
          <Slider
            min={min}
            max={max}
            step={step}
            value={[value.min ?? min, value.max ?? max]}
            onValueChange={([minVal, maxVal]) =>
              onChange({
                min: minVal,
                max: maxVal,
              })
            }
          />
          <div className="flex justify-between items-start text-sm text-muted-foreground">
            <div className="flex flex-col">
              <span className="font-medium">Selected:</span>
              <span>{display}</span>
            </div>
            {showClear && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange({ min: null, max: null })}
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
