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
