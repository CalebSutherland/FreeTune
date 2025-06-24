import type { ChordDb } from "../types/types";
import { getFretNumbers, getStringStates } from "../utils/chord-utils";
import "./chord-diagram.css";

interface ChordDiagramProps {
  chord: ChordDb;
}

export default function ChordDiagram({ chord }: ChordDiagramProps) {
  const frets = [0, 1, 2, 3];
  const strings = [0, 1, 2, 3, 4, 5];

  const stringStates = getStringStates(chord.frets);
  const fretNumbers = getFretNumbers(chord.baseFret);

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

          {chord.frets.map((fret, stringIndex) => {
            const finger = chord.fingers[stringIndex];

            if (fret <= 0 || finger === 0) return null;

            const left = (stringIndex / 5) * 100;
            const top = (fret - 0.5) * 25;

            return (
              <div
                key={stringIndex}
                className="finger"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                {finger}
              </div>
            );
          })}

          {strings.map((stringIndex) => (
            <div
              className="string-line"
              key={stringIndex}
              style={{ left: `${(stringIndex / 5) * 100}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
