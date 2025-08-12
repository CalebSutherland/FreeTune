export type User = {
  id: number;
};

export type UserWithPassword = {
  id: number;
  password_hash: string;
};

export type InstrumentSettings = {
  instrumentFamilyIndex: number;
  instrumentIndex: number;
  tuningName: string;
  tuningNotes: string[];
  visualName: string;
};

export type TunerSettings = {
  isProAccuracy: boolean;
  minVolume: number;
  clarity: number;
  minPitch: number;
  maxPitch: number;
  buffer: number;
};

export type MetronomeSettings = {
  beatsPerMeasure: number;
  beatType: number;
  bpm: number;
  sound: string;
};

export type ChordSettings = {
  size: "sm" | "xs" | "md" | "lg" | "xl";
  speed: "slow" | "fast";
};
