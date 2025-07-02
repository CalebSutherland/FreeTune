const noteStrings = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];

export function calculateFrequencyDifference(
  pitch: number | null,
  targetFreq: number | null
) {
  if (pitch === null || targetFreq === null) {
    return null;
  }
  return pitch - targetFreq;
}

export function calculateCentsDifference(
  pitch: number | null,
  targetFreq: number | null
) {
  if (pitch === null || targetFreq === null) {
    return null;
  }
  return 1200 * Math.log2(pitch / targetFreq);
}

export const getNoteName = (frequency: number | null) => {
  if (!frequency) return "No note detected";

  const noteNumber = 12 * (Math.log(frequency / 440) / Math.log(2));
  const roundedNote = Math.round(noteNumber) + 69;
  const noteIndex = roundedNote % 12;
  const octave = Math.floor(roundedNote / 12) - 1;

  return `${noteStrings[noteIndex]}${octave}`;
};

export const getFrequencyFromNote = (noteName: string | null) => {
  if (!noteName) return null;
  const regex = /^([A-G]♯?)(-?\d+)$/;
  const match = noteName.match(regex);

  if (!match) return null;

  const note = match[1];
  const octave = parseInt(match[2]);

  const noteIndex = noteStrings.indexOf(note);
  if (noteIndex === -1) return null;

  const midiNumber = noteIndex + (octave + 1) * 12;
  const frequency = 440 * Math.pow(2, (midiNumber - 69) / 12);

  return frequency;
};

export const getClosestNote = (
  pitch: number,
  tuningNotes?: string[]
): string => {
  const notes = tuningNotes ?? generateAllNoteNames();

  let closestNote = notes[0];
  let smallestDiff = Math.abs(pitch - getFrequencyFromNote(closestNote)!);

  notes.forEach((note) => {
    const noteFreq = getFrequencyFromNote(note);
    if (!noteFreq) return;

    const diff = Math.abs(pitch - noteFreq);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestNote = note;
    }
  });

  return closestNote;
};

export function generateAllNoteNames(): string[] {
  const notes: string[] = [];

  for (let octave = 0; octave <= 8; octave++) {
    noteStrings.forEach((note) => {
      const fullNote = `${note}${octave}`;
      if (getFrequencyFromNote(fullNote)) {
        notes.push(fullNote);
      }
    });
  }

  return notes;
}
