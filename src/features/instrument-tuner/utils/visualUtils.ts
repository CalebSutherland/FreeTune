export function getColorFromFreqDiff(
  freqDiff: number | null,
  fallback: string
): string {
  if (freqDiff === null) return fallback;

  const absDiff = Math.abs(freqDiff);

  // In tune range (green)
  if (absDiff <= 2) return "#00ff00";

  // Transition from green to yellow (2-5 Hz)
  if (absDiff <= 5) {
    const ratio = (absDiff - 2) / 3; // 0 to 1 as diff goes from 2 to 5
    const red = Math.round(255 * ratio);
    return `rgb(${red}, 255, 0)`;
  }

  // Transition from yellow to red (5-10 Hz)
  if (absDiff <= 10) {
    const ratio = (absDiff - 5) / 5; // 0 to 1 as diff goes from 5 to 10
    const green = Math.round(255 * (1 - ratio));
    return `rgb(255, ${green}, 0)`;
  }

  // Very out of tune (red)
  return "#ff0000";
}

export function calculateNeedleRotation(
  freqDifference: number | null,
  maxHz: number
) {
  if (freqDifference === null) return 0;
  const clampedHz = Math.max(Math.min(freqDifference, maxHz), -maxHz);
  return (clampedHz / maxHz) * 90;
}
