import db from "../../config/db";
import {
  ChordSettings,
  InstrumentSettings,
  MetronomeSettings,
  TunerSettings,
} from "../../types/user-types";

export async function updateInstrument(
  userId: number,
  settings: InstrumentSettings
) {
  await db.none(
    `
    UPDATE user_settings
    SET instrument_family_index = $1,
        instrument_index = $2,
        tuning_name = $3,
        tuning_notes = $4,
        visual_name = $5
    WHERE user_id = $6
    `,
    [
      settings.instrumentFamilyIndex,
      settings.instrumentIndex,
      settings.tuningName,
      settings.tuningNotes,
      settings.visualName,
      userId,
    ]
  );
}

export async function updateTuner(userId: number, settings: TunerSettings) {
  await db.none(
    `
    UPDATE user_settings
    SET is_pro_accuracy = $1,
        min_volume = $2,
        clarity = $3,
        min_pitch = $4,
        max_pitch = $5,
        buffer = $6
    WHERE user_id = $7
    `,
    [
      settings.isProAccuracy,
      settings.minVolume,
      settings.clarity,
      settings.minPitch,
      settings.maxPitch,
      settings.buffer,
      userId,
    ]
  );
}

export async function updateMetronome(
  userId: number,
  settings: MetronomeSettings
) {
  await db.none(
    `
    UPDATE user_settings
    SET bpm = $1,
        beats_per_measure = $2,
        beat_type = $3,
        sound = $4
    WHERE user_id = $5
    `,
    [
      settings.bpm,
      settings.beatsPerMeasure,
      settings.beatType,
      settings.sound,
      userId,
    ]
  );
}

export async function updateChord(userId: number, settings: ChordSettings) {
  await db.none(
    `
    UPDATE user_settings
    SET chord_size = $1,
        chord_speed = $2
    WHERE user_id = $3
    `,
    [settings.size, settings.speed, userId]
  );
}
