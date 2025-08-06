type InstrumentSettings = {
  instrumentFamilyIndex: number;
  instrumentIndex: number;
  tuningName: string;
  tuningNotes: string[];
  visualName: string;
};

type TunerSettings = {
  isProAccuracy: boolean;
  minVolume: number;
  clarity: number;
  minPitch: number;
  maxPitch: number;
  buffer: number;
};

type MetronomeSettings = {
  timeSignature: string;
  bpm: number;
  sound: string;
};

type ChordLibrarySettings = {
  chordSize: string;
  chordSpeed: string;
};

export type UserSettings = {
  instrument: InstrumentSettings;
  tuner: TunerSettings;
  metronome: MetronomeSettings;
  chordLibrary: ChordLibrarySettings;
};

export type User = {
  id: number;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
};
