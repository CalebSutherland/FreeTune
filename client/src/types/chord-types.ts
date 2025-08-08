import db from "@tombatossals/chords-db/lib/guitar.json";

export type Chord = {
  barres: number[];
  baseFret: number;
  capo?: boolean;
  fingers: number[];
  frets: number[];
  midi: number[];
};

export type Key = keyof typeof db.chords;
