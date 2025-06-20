import type { TunerSettings } from "@/types/tuner-types";

export const defaultSettings: TunerSettings = {
  bufferSize: 2048,
  minVolumeDecibels: -40,
  minClarityPercent: 95,
  minPitch: 30,
  maxPitch: 10000,
};
