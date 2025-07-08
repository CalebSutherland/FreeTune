import { midiToNoteName } from "../../utils/chord-utils";

interface FingerButtonProps {
  finger: number;
  midi: number;
  playNote: (note: string) => void;
  loadInstrument: (instrument: string) => void;
  example?: boolean;
}

export default function FingerButton({
  finger,
  midi,
  playNote,
  loadInstrument,
  example,
}: FingerButtonProps) {
  const handleClick = async () => {
    await loadInstrument("acoustic_guitar_nylon");
    const note = midiToNoteName(midi);
    playNote(note);
  };

  return (
    <button
      className={`finger-${finger} ${example ? "example" : ""}`}
      onClick={handleClick}
    >
      {finger}
    </button>
  );
}
