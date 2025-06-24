import data from "../data/chord-data.json";
import type { Note } from "../types/types";
import ChordDiagram from "./chord-diagram";

const notes = data as Note[];

export default function ChordLibrary() {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.note}>
          <h2>{note.note}</h2>
          {note.keys.map((key) => (
            <div key={`${note.note} ${key.name}`}>
              <h3>{key.name}</h3>
              {key.chords.map((chord, index) => (
                <ChordDiagram key={index} chord={chord} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
