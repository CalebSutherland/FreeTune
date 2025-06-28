import type { Chord } from "@/types/chord-types";
import {
  getBarrePosition,
  getFretNumbers,
  getMidiForString,
  getStringStates,
  midiToNoteName,
} from "../../utils/chord-utils";
import { scaleMap } from "../../utils/scale-map";
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

  const scale = scaleMap[size ?? "xs"];

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
          {stringStates.map((stringIndicator, index) => {
            const midi = getMidiForString(chord.frets, chord.midi, index);
            const note = midiToNoteName(midi ?? 0);
            return (
              <div
                key={index}
                className="string-indicator"
                style={{ left: `${(index / 5) * 100}%` }}
              >
                {stringIndicator === "O" ? (
                  <button
                    className="open-button"
                    onClick={() => playNote(note)}
                  >
                    {stringIndicator}
                  </button>
                ) : (
                  <p>{stringIndicator}</p>
                )}
              </div>
            );
          })}
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
              className={`barre-${barre.finger}`}
              style={{
                top: `${(barre.position - 0.5) * 25}%`,
                left: `calc(${(barre.fromString / 5) * 100}% - calc(1rem * ${
                  scaleMap[size ?? "md"]
                }))`,
                width: `calc(${
                  ((barre.toString - barre.fromString) / 5) * 100
                }% + calc(2rem * ${scaleMap[size ?? "md"]}))`,
              }}
            >
              <p className="barre-label">{barre.finger}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
