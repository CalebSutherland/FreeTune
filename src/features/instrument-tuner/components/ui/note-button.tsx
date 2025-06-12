import "./note-button.css";

interface NoteButtonProps {
  note: string;
}

export default function NoteButton({ note }: NoteButtonProps) {
  return <button className="note-button">{note}</button>;
}
