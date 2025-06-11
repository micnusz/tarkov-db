"use client";
export default function formatCurrency(name: string, amount: number): string {
  if (name.toLowerCase() === "roubles") {
    return `${amount.toLocaleString("ge-GE")} ₽`;
  }
  if (name.toLowerCase() === "dollars") {
    return `$${amount.toLocaleString("en-US")}`;
  }
  if (name.toLowerCase() === "euros") {
    return `${amount.toLocaleString("ge-GE")} €`;
  }
  return `${amount}`;
}
