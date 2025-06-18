export default function RicochetChanceFormat(ricochetValue: number): string {
  if (ricochetValue >= 0.4) {
    return "High";
  } else if (ricochetValue === 0.3 || ricochetValue === 0.2) {
    return "Medium";
  } else if (ricochetValue === 0.1) {
    return "Low";
  } else return "No ricochet chance";
}
