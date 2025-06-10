import type { Tuning } from "../types/types";
import { FaRegCircleCheck } from "react-icons/fa6";
import "./tuning-card.css";

interface TuningCardProps {
  instrumentName: string;
  tuning: Tuning;
  currentTuning: Tuning;
  displayIndex: number;
  instrumentIndex: number;
  changeInstrument: (
    displayIndex: number,
    tuningIndex: number,
    tuning: Tuning
  ) => void;
}

export default function TuningCard({
  instrumentName,
  tuning,
  currentTuning,
  displayIndex,
  instrumentIndex,
  changeInstrument,
}: TuningCardProps) {
  return (
    <button
      onClick={() => changeInstrument(displayIndex, instrumentIndex, tuning)}
      className="tuning-card"
    >
      <div className="tuning-card-label">
        <p className="card-name">{instrumentName}</p>
        <p className="card-tuning">{tuning.name}</p>
      </div>
      <span className="tuning-card-notes-wrapper">
        {/* note icons */}
        {tuning.notes.map((note, note_i) => {
          const base = note.charAt(0);
          const sub = note.slice(1);
          return (
            <span key={note_i} className="tuning-note-wrapper">
              <p className="tuning-note">
                {base}
                <sub className={`note-sub ${note.length > 2 ? "small" : ""}`}>
                  {sub}
                </sub>
              </p>
            </span>
          );
        })}
      </span>
      <div className="active-icon-wrapper">
        {currentTuning === tuning && (
          <FaRegCircleCheck color="green" size={26} />
        )}
      </div>
    </button>
  );
}
