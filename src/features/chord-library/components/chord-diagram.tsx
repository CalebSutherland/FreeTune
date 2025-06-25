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
}

export default function ChordDiagram({
  chord,
  playNote,
  loadInstrument,
}: ChordDiagramProps) {
  const frets = [0, 1, 2, 3];
  const strings = [0, 1, 2, 3, 4, 5];

  const stringStates = getStringStates(chord.frets);
  const fretNumbers = getFretNumbers(chord.baseFret);
  const barre = getBarrePosition(chord.frets, chord.fingers, chord.barres);

  return (
    <div className="chord-diagram-wrapper">
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
                left: `calc(${(barre.fromString / 5) * 100}% - 0.9rem)`,
                width: `calc(${
                  ((barre.toString - barre.fromString) / 5) * 100
                }% + 1.8rem)`,
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
