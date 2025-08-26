import type { Instrument, Tuning } from "../../types/types";
import NoteButton from "../ui/note-button";
import "./notes-display.css";
import type React from "react";

interface NotesDisplayProps {
  instrument: Instrument;
  imgUrl: string;
  tuning: Tuning;
  target: string | null;
  setTarget: React.Dispatch<React.SetStateAction<string | null>>;
  freqDifference: number | null;
  autoMode: boolean;
  setAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  playNote: (note: string) => void;
}

export default function NotesDisplay({
  instrument,
  imgUrl,
  tuning,
  target,
  setTarget,
  freqDifference,
  autoMode,
  setAutoMode,
  playNote,
}: NotesDisplayProps) {
  const leftNotes = tuning.notes
    .slice(0, instrument.left_string_count)
    .reverse();
  const rightNotes = tuning.notes.slice(instrument.left_string_count);

  return (
    <div className="notes-display">
      <div className="notes-column left">
        {leftNotes.map((note) => (
          <div key={note}>
            <NoteButton
              note={note}
              target={target}
              setTarget={setTarget}
              autoMode={autoMode}
              setAutoMode={setAutoMode}
              freqDifference={freqDifference}
              tuning={tuning}
              playNote={playNote}
            />
          </div>
        ))}
      </div>
      <div className="img-wrapper">
        <img
          className="instrument-img"
          src={`images/instruments/${imgUrl}`}
        ></img>
      </div>
      <div className="notes-column">
        {rightNotes.map((note) => (
          <div key={note}>
            <NoteButton
              note={note}
              target={target}
              setTarget={setTarget}
              autoMode={autoMode}
              setAutoMode={setAutoMode}
              freqDifference={freqDifference}
              tuning={tuning}
              playNote={playNote}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
