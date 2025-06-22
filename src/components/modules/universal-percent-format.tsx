export default function UniversalPercentFormat(
  val:
    | string
    | number
    | { min: number | null; max: number | null }
    | null
    | undefined
): string {
  if (val == null) return "Any";

  if (typeof val === "string") {
    return val;
  }

  if (typeof val === "number") {
    return `${Math.round(val * 100)}%`;
  }

  const { min, max } = val;

  const minFormatted = min != null ? Math.round(min * 100) : null;
  const maxFormatted = max != null ? Math.round(max * 100) : null;

  if (minFormatted === null && maxFormatted === null) return "Any";
  if (minFormatted !== null && maxFormatted !== null)
    return `${minFormatted} – ${maxFormatted}%`;
  if (minFormatted !== null) return `From ${minFormatted}%`;
  if (maxFormatted !== null) return `Up to ${maxFormatted}%`;

  return "Any";
}
