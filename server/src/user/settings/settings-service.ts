import type {
  ChordSettings,
  InstrumentSettings,
  MetronomeSettings,
  TunerSettings,
} from "../../types/user-types";
import * as settingsRepository from "./settings-queries";

export async function updateInstrument(
  userId: number,
  settings: InstrumentSettings
) {
  try {
    await settingsRepository.updateInstrument(userId, settings);
  } catch (err) {
    throw new Error("Database update failed");
  }
}

export async function updateTuner(userId: number, settings: TunerSettings) {
  try {
    await settingsRepository.updateTuner(userId, settings);
  } catch (err) {
    throw new Error("Database update failed");
  }
}

export async function updateMetronome(
  userId: number,
  settings: MetronomeSettings
) {
  try {
    await settingsRepository.updateMetronome(userId, settings);
  } catch (err) {
    throw new Error("Database update failed");
  }
}

export async function updateChord(userId: number, settings: ChordSettings) {
  try {
    await settingsRepository.updateChord(userId, settings);
  } catch (err) {
    throw new Error("Database update failed");
  }
}
