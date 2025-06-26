export function getStringStates(frets: number[]): ("X" | "O" | "")[] {
  const stringStates: ("X" | "O" | "")[] = [];

  frets.map((fret, index) => {
    if (fret === -1) {
      stringStates[index] = "X";
    } else if (fret === 0) {
      stringStates[index] = "O";
    } else {
      stringStates[index] = "";
    }
  });
  return stringStates;
}

export function getFretNumbers(baseFret: number): number[] {
  const frets = [];
  for (let i = 0; i < 4; i++) {
    frets[i] = baseFret + i;
  }
  return frets;
}

export function getBarrePosition(
  frets: number[],
  fingers: number[],
  barres: number[]
): {
  position: number;
  finger: number;
  fromString: number;
  toString: number;
} | null {
  if (!barres || barres.length === 0) return null;

  const position = barres[0]; // the fret number being barred

  const barreStrings: number[] = [];

  for (let i = 0; i < frets.length; i++) {
    if (frets[i] === position) {
      barreStrings.push(i); // store string index (0 = low E, 5 = high E)
    }
  }

  if (barreStrings.length < 2) return null;

  const fromString = Math.min(...barreStrings);
  const toString = Math.max(...barreStrings);
  const finger = fingers[barreStrings[0]] || 1; // fallback to finger 1 if unknown

  return {
    position,
    finger,
    fromString,
    toString,
  };
}

const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function midiToNoteName(midi: number): string {
  const note = noteNames[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${note}${octave}`;
}

export function getMidiForString(
  frets: number[],
  midi: number[],
  stringIndex: number
): number | null {
  let playedIndex = -1;

  for (let i = 0; i <= stringIndex; i++) {
    if (frets[i] !== -1) {
      playedIndex++;
    }
  }

  return frets[stringIndex] === -1 ? null : midi[playedIndex] ?? null;
}

export function formatKeyName(key: string): string {
  return key.replace(/sharp/g, "♯").replace(/b/g, "♭");
}
