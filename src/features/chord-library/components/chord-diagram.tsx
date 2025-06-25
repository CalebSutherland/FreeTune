import type { Chord } from "../types/types";
import {
  getBarrePosition,
  getFretNumbers,
  getMidiForString,
  getStringStates,
} from "../utils/chord-utils";
import FingerButton from "./finger-button";
import "./chord-diagram.css";

interface ChordDiagramProps {
  chord: Chord;
  playNote: (note: string) => void;
  loadInstrument: (instrument: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function ChordDiagram({
  chord,
  playNote,
  loadInstrument,
  size,
}: ChordDiagramProps) {
  const frets = [0, 1, 2, 3];
  const strings = [0, 1, 2, 3, 4, 5];

  const stringStates = getStringStates(chord.frets);
  const fretNumbers = getFretNumbers(chord.baseFret);
  const barre = getBarrePosition(chord.frets, chord.fingers, chord.barres);

  const scaleMap = {
    xs: 0.6,
    sm: 0.8,
    md: 1,
    lg: 1.2,
    xl: 1.4,
  };

  const scale = scaleMap[size ?? "sm"];

  return (
    <div
      className="chord-diagram-wrapper"
      style={{ ["--scale" as any]: scale }}
    >
      <div className="chord-diagram">
        {/* Empty corner cell */}
        <div className="grid-empty"></div>

        {/* String indicators */}
        <div className="string-indicators-wrapper">
          {stringStates.map((stringIndicator, index) => (
            <div
              key={index}
              className="string-indicator"
              style={{ left: `${(index / 5) * 100}%` }}
            >
              {stringIndicator}
            </div>
          ))}
        </div>

        {/* Fret numbers */}
        <div className="fret-numbers">
          {fretNumbers.map((number) => (
            <div key={number} className="fret-number">
              {number}
            </div>
          ))}
        </div>

        {/* Fretboard */}
        <div className="fretboard">
          {frets.map((_, i) => (
            <div
              key={i}
              className="fret-line"
              style={{ top: `${(i + 1) * 25}%` }}
            ></div>
          ))}

          {strings.map((stringIndex) => (
            <div
              className="string-line"
              key={stringIndex}
              style={{ left: `${(stringIndex / 5) * 100}%` }}
            ></div>
          ))}

          {/* Fingers */}
          {chord.frets.map((fret, stringIndex) => {
            const finger = chord.fingers[stringIndex];
            const midiNote = getMidiForString(
              chord.frets,
              chord.midi,
              stringIndex
            );

            if (fret <= 0 || finger === 0 || midiNote === null) return null;

            const left = (stringIndex / 5) * 100;
            const top = (fret - 0.5) * 25;

            return (
              <div
                key={stringIndex}
                className="finger-wrapper"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <FingerButton
                  finger={finger}
                  midi={midiNote}
                  playNote={playNote}
                  loadInstrument={loadInstrument}
                />
              </div>
            );
          })}

          {barre && (
            <div
              className="barre"
              style={{
                top: `${(barre.position - 0.5) * 25}%`,
                left: `${(barre.fromString / 5) * 100}%`,
                width: `${((barre.toString - barre.fromString) / 5) * 100}% `,
              }}
            >
              {barre.finger}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
