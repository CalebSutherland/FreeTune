import type { Chord } from "../types/types";
import "./chord-diagram.css";

interface ChordDiagramProps {
  chord: Chord;
}

export default function ChordDiagram({ chord }: ChordDiagramProps) {
  const frets = [1, 2, 3, 4];
  const strings = [1, 2, 3, 4, 5, 6];

  return (
    <div className="chord-diagram-wrapper">
      <div className="chord-diagram">
        {/* Empty corner cell */}
        <div className="grid-empty"></div>

        {/* String indicators */}
        <div className="string-indicators-wrapper">
          {strings.map((_, stringIndex) => (
            <div
              key={stringIndex}
              className="string-indicator"
              style={{ left: `${(stringIndex / 5) * 100}%` }}
            >
              {chord.stringStates[stringIndex] === "x"
                ? "X"
                : chord.stringStates[stringIndex] === "o"
                ? "O"
                : ""}
            </div>
          ))}
        </div>

        {/* Fret numbers */}
        <div className="fret-numbers">
          {frets.map((fretNumber, index) => (
            <div key={fretNumber} className="fret-number">
              {chord.baseFret ? chord.baseFret + index : 1 + index}
            </div>
          ))}
        </div>

        {/* Fretboard */}
        <div className="fretboard">
          {frets.map((_, index) => (
            <div
              key={index}
              className="fret-line"
              style={{ top: `${(index + 1) * 25}%` }}
            ></div>
          ))}

          {strings.map((stringIndex) => (
            <div
              className="string-line"
              key={stringIndex}
              style={{ left: `${((stringIndex - 1) / 5) * 100}%` }}
            >
              {chord.fingers.map((finger, idx) => {
                if (finger.string === stringIndex) {
                  return (
                    <div
                      key={idx}
                      className="finger"
                      style={{ top: `${(finger.position - 0.5) * 25}%` }}
                    >
                      {finger.finger}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}

          {/* Render barre if it exists */}
          {chord.barre && (
            <div
              className="barre"
              style={{
                top: `${(chord.barre.position - 0.5) * 25}%`,
                left: `calc(${
                  ((chord.barre.fromString - 1) / 5) * 100
                }% - 0.5rem)`,
                width: `calc(${
                  ((chord.barre.toString - chord.barre.fromString) / 5) * 100
                }% + 1rem)`,
              }}
            >
              {chord.barre.finger}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
