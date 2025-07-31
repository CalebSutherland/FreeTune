import "./note.css";

interface NoteProps {
  note: string | null;
}

export default function Note({ note }: NoteProps) {
  if (note == null) return;

  const noteName = note[0];
  let symbol;
  let octave;

  if (note.length > 2) {
    symbol = note[1];
    octave = note[2];
  } else {
    symbol = null;
    octave = note[1];
  }
  return (
    <div className="note-wrapper">
      <div className="note">{noteName}</div>
      <div className="suffix">
        <div className="symbol">{symbol}</div>
        <div className="octave">{octave}</div>
      </div>
    </div>
  );
}
