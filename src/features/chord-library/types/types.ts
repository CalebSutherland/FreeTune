export type FingerPosition = {
  string: number;
  position: number;
  finger: number;
};

export type Chord = {
  stringStates: ("x" | "o" | null)[];
  fingers: FingerPosition[];
  baseFret?: number;
  barre?: {
    position: number;
    finger: number;
    fromString: number;
    toString: number;
  };
};

export type ChordDb = {
  barres: number[];
  baseFret: number;
  capo?: boolean;
  fingers: number[];
  frets: number[];
  midi: number[];
};

export type Key = {
  name: string;
  chords: Chord[];
};

export type Note = {
  note: string;
  keys: Key[];
};
