export default function HeadsetsDistortionFormat(distortion: number): string {
  return `${Math.round(distortion * 100)}%`;
}
