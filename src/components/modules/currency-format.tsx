export default function formatCurrency(name: string, amount: number): string {
  if (name.toLowerCase() === "roubles") {
    return `${amount.toLocaleString("ge-GE")} ₽`;
  }
  if (name.toLowerCase() === "dollars") {
    return `$${amount.toLocaleString("en-US")}`;
  }
  return `${amount}`;
}
