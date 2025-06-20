export default function UniversalCurrencyFormat(
  value:
    | string
    | number
    | { min: number | null; max: number | null }
    | null
    | undefined
): string {
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (value == null || value === "") return "–";

  if (typeof value === "number" || typeof value === "string") {
    const number = Number(value);
    return isNaN(number) ? "–" : formatter.format(number);
  }

  if (typeof value === "object") {
    const { min, max } = value;
    const formattedMin = min != null ? formatter.format(min) : "–";
    const formattedMax = max != null ? formatter.format(max) : "–";

    if (min != null && max != null && min === max) return formattedMin;
    return `${formattedMin} – ${formattedMax}`;
  }

  return "–";
}
