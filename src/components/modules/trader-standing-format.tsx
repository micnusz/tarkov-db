"use client";
export default function traderStandingFormat(standing: number) {
  if (standing > 0) {
    return (
      <span className="text-green-600">
        +{standing.toLocaleString("de-DE")}
      </span>
    );
  } else {
    return (
      <span className="text-red-600">{standing.toLocaleString("de-DE")}</span>
    );
  }
}
