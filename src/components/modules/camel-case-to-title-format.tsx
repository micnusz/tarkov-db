export function camelCaseToTitleFormat(value: string): string {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function safeCamelCaseToTitle(
  value:
    | string
    | number
    | { min: number | null; max: number | null }
    | null
    | undefined
): string {
  if (typeof value === "string") {
    return camelCaseToTitleFormat(value); // 👈 upewnij się, że to nie wywołuje samej siebie!
  }

  if (typeof value === "number") {
    return value.toString();
  }

  if (value && typeof value === "object" && "min" in value && "max" in value) {
    const { min, max } = value;
    if (min != null && max != null) return `${min} – ${max}`;
    if (min != null) return `From ${min}`;
    if (max != null) return `Up to ${max}`;
    return "Any";
  }

  return "Any";
}
