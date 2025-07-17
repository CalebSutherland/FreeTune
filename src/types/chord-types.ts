import db from "@tombatossals/chords-db/lib/guitar.json";

export type Chord = {
  barres: number[];
  baseFret: number;
  capo?: boolean;
  fingers: number[];
  frets: number[];
  midi: number[];
};

export type ChordLibraryContextType = {
  size: "xs" | "sm" | "md";
  setSize: (size: "xs" | "sm" | "md") => void;
  speed: "fast" | "slow";
  setSpeed: (speed: "fast" | "slow") => void;
};

export type Key = keyof typeof db.chords;
