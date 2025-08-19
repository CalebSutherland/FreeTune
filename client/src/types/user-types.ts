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

export type UserSettingsContextType = {
  instrumentSettings: InstrumentSettings;
  tunerSettings: TunerSettings;
  metronomeSettings: MetronomeSettings;
  chordSettings: ChordSettings;

  updateInstrumentSettings: (updates: Partial<InstrumentSettings>) => void;
  updateTunerSettings: (updates: Partial<TunerSettings>) => void;
  updateMetronomeSettings: (updates: Partial<MetronomeSettings>) => void;
  updateChordSettings: (updates: Partial<ChordSettings>) => void;
};

export type User = {
  id: number;
  picture?: string | null;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  isFirstAlert: boolean;
  setIsFirstAlert: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};
