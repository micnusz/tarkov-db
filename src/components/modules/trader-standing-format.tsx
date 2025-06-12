"use client";
export default function traderStandingFormat(standing: number) {
  if (standing > 0) {
    return (
      <span className="text-chart-2">+{standing.toLocaleString("de-DE")}</span>
    );
  } else {
    return (
      <span className="text-chart-3">{standing.toLocaleString("de-DE")}</span>
    );
  }
}
