"use client";

export default function CraftingDurationFormat(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  if (hours > 0) {
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}min`);
    return parts.join(" ");
  } else {
    const parts = [];
    if (minutes > 0) parts.push(`${minutes}min`);
    parts.push(`${seconds.toString().padStart(2, "0")}sec`);
    return parts.join(" ");
  }
}
