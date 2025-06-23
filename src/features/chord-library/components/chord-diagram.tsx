import "./chord-diagram.css";

export type FingerPosition = {
  string: number; // 1 (high E) to 6 (low E)
  fret: number; // fret number to display
  finger: number; // finger number (1-indexed)
};

export type Chord = {
  name: string;
  positions: (number | "x")[]; // array length 6, from low E to high E
  fingers: FingerPosition[]; // where to render finger dots
};

type ChordDiagramProps = {
  chord?: Chord;
};

const C_MAJOR: Chord = {
  name: "C Major",
  positions: ["x", 3, 2, 0, 1, 0], // low E to high E
  fingers: [
    { string: 5, fret: 3, finger: 3 },
    { string: 4, fret: 2, finger: 2 },
    { string: 2, fret: 1, finger: 1 },
  ],
};

const D_MAJOR: Chord = {
  name: "D Major",
  positions: ["x", "x", 0, 2, 3, 2], // low E to high E
  fingers: [
    { string: 3, fret: 2, finger: 1 },
    { string: 2, fret: 3, finger: 3 },
    { string: 1, fret: 2, finger: 2 },
  ],
};

export default function ChordDiagram({ chord = D_MAJOR }: ChordDiagramProps) {
  const frets = [1, 2, 3, 4];
  const strings = [0, 1, 2, 3, 4, 5]; // index from low E to high E

  return (
    <div className="chord-diagram-wrapper">
      <div className="chord-diagram">
        {/* Empty corner cell */}
        <div className="grid-empty"></div>

        {/* String indicators */}
        <div className="string-indicators-wrapper">
          {strings.map((stringIndex) => (
            <div
              key={stringIndex}
              className="string-indicator"
              style={{ left: `${(stringIndex / 5) * 100}%` }} // same as string lines
            >
              {chord.positions[stringIndex] === "x"
                ? "X"
                : chord.positions[stringIndex] === 0
                ? "O"
                : ""}
            </div>
          ))}
        </div>

        {/* Fret numbers */}
        <div className="fret-numbers">
          {frets.map((fretNumber) => (
            <div key={fretNumber} className="fret-number">
              {fretNumber}
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
              style={{ left: `${(stringIndex / 5) * 100}%` }}
            >
              {chord.fingers.map((finger, idx) => {
                if (finger.string === 6 - stringIndex) {
                  return (
                    <div
                      key={idx}
                      className="finger"
                      style={{ top: `${(finger.fret - 0.5) * 25}%` }}
                    >
                      {finger.finger}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
