import type { Instrument, Tuning } from "../../types/types";
import NoteButton from "../ui/note-button";
import guitarImage from "../../assets/guitar6.png";
import "./notes-display.css";

interface NotesDisplayProps {
  instrument: Instrument;
  tuning: Tuning;
}

export default function NotesDisplay({
  instrument,
  tuning,
}: NotesDisplayProps) {
  const leftNotes = tuning.notes
    .slice(0, instrument.left_string_count)
    .reverse();
  const rightNotes = tuning.notes.slice(instrument.left_string_count);
  return (
    <div className="notes-display">
      <div className="notes-column">
        {leftNotes.map((note) => (
          <div key={note}>
            <NoteButton note={note} />
          </div>
        ))}
      </div>
      <div className="img-wrapper">
        <img className="instrument-img" src={guitarImage}></img>
      </div>
      <div className="notes-column">
        {rightNotes.map((note) => (
          <div key={note}>
            <NoteButton note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}
