export function getColorFromFreqDiff(
  freqDiff: number | null,
  fallback: string
): string {
  if (freqDiff === null) return fallback;

  const absDiff = Math.abs(freqDiff);

  // In tune range (green)
  if (absDiff <= 1.5) return "#00ff00";

  // Transition from green to yellow (1.5-3 Hz)
  if (absDiff <= 3) {
    const ratio = (absDiff - 1.5) / 1;
    const red = Math.round(255 * ratio);
    return `rgb(${red}, 255, 0)`;
  }

  // Transition from yellow to red (3-10 Hz)
  if (absDiff <= 10) {
    const ratio = (absDiff - 3) / 7;
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
