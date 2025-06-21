export default function malfunctionChanceFormat(chance: number): string {
  if (chance >= 0.5) return "Very high";
  if (chance >= 0.4) return "High";
  if (chance >= 0.3) return "Medium";
  if (chance >= 0.2) return "Low";
  if (chance >= 0.1) return "Very low";
  return "Very low";
}
