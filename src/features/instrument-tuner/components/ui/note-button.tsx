import "./note-button.css";

interface NoteButtonProps {
  note: string;
  target: string | null;
  setTarget: React.Dispatch<React.SetStateAction<string | null>>;
  autoMode: boolean;
  setAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoteButton({
  note,
  target,
  setTarget,
  autoMode,
  setAutoMode,
}: NoteButtonProps) {
  return (
    <button
      className={`note-button ${target === note ? "active" : ""}`}
      onClick={() => {
        setTarget(note);
        if (autoMode) {
          setAutoMode(false);
        }
      }}
    >
      {note.slice(0, note.length - 1)}
    </button>
  );
}
