export default function UniversalFormat(
  val:
    | string
    | number
    | { min: number | null; max: number | null }
    | null
    | undefined
): string {
  if (val == null) return "Any";

  if (typeof val === "string" || typeof val === "number") {
    return val.toString();
  }

  if (val.min === null && val.max === null) return "Any";
  if (val.min !== null && val.max !== null) return `${val.min} – ${val.max}`;
  if (val.min !== null) return `From ${val.min}`;
  if (val.max !== null) return `Up to ${val.max}`;
  return "Any";
}
