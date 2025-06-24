import data from "../data/chord-data.json";
import type { Note } from "../types/types";
import ChordDiagram from "./chord-diagram";

import db from "@tombatossals/chords-db/lib/guitar.json";

const notes = data as Note[];

export default function ChordLibrary() {
  const cMajor = db.chords.C.find((chord) => chord.suffix === "major");
  if (!cMajor) return <div>No chord found</div>;
  const position = cMajor.positions[0];
  const C = db.chords.C;

  console.log(cMajor?.positions);
  console.log(position);
  return <ChordDiagram chord={position} />;
}
