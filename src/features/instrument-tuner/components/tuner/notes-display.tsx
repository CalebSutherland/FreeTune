import type { Instrument, Tuning } from "../../types/types";
import NoteButton from "../ui/note-button";
import guitarImage from "../../assets/guitar6.png";
import "./notes-display.css";
import type React from "react";

interface NotesDisplayProps {
  instrument: Instrument;
  tuning: Tuning;
  target: string | null;
  setTarget: React.Dispatch<React.SetStateAction<string | null>>;
  freqDifference: number | null;
  autoMode: boolean;
  setAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  playNote: (note: string, instrumentName: string) => void;
  soundfontName: string;
}

export default function NotesDisplay({
  instrument,
  tuning,
  target,
  setTarget,
  freqDifference,
  autoMode,
  setAutoMode,
  playNote,
  soundfontName,
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
            <NoteButton
              note={note}
              target={target}
              setTarget={setTarget}
              autoMode={autoMode}
              setAutoMode={setAutoMode}
              freqDifference={freqDifference}
              tuning={tuning}
              playNote={playNote}
              soundfontName={soundfontName}
            />
          </div>
        ))}
      </div>
      <div className="img-wrapper">
        <img className="instrument-img" src={guitarImage}></img>
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
              soundfontName={soundfontName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
