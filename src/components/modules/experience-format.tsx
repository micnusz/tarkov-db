"use client";
export default function formatExperience(exp: number): string {
  return `${exp.toLocaleString("ge-GE")} EXP`;
}
