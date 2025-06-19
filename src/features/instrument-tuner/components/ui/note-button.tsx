import { useEffect, useState, useRef } from "react";
import "./note-button.css";
import type { Tuning } from "../../types/types";

interface NoteButtonProps {
  note: string;
  target: string | null;
  setTarget: React.Dispatch<React.SetStateAction<string | null>>;
  freqDifference: number | null;
  autoMode: boolean;
  setAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  tuning: Tuning;
}

export default function NoteButton({
  note,
  target,
  setTarget,
  freqDifference,
  autoMode,
  setAutoMode,
  tuning,
}: NoteButtonProps) {
  const [inTune, setInTune] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInTune(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [tuning]);

  useEffect(() => {
    // If it's not the active target, clear any timer and return
    if (target !== note) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    if (freqDifference !== null && Math.abs(freqDifference) <= 1.5) {
      // Start the 500ms timer if within range
      if (!inTune && !timerRef.current) {
        timerRef.current = setTimeout(() => {
          setInTune(true);
          timerRef.current = null;
        }, 500);
      }
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [freqDifference, target, note, inTune]);

  return (
    <button
      className={`note-button ${target === note ? "active" : ""} ${
        inTune ? "in-tune" : ""
      }`}
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
