export default function HeadsetsDistanceFormat(modifier: number): string {
  const percent = (modifier - 1) * 100;
  const sign = percent >= 0 ? "+" : "";
  return `${sign}${Math.round(percent)}%`;
}
