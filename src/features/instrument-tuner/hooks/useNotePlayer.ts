import { useRef } from "react";
import { Soundfont } from "smplr";

export function useNotePlayer() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const instrumentRef = useRef<any>(null);
  const isLoadedRef = useRef(false);
  const currentInstrumentNameRef = useRef<string | null>(null);

  const initializeAudio = async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }
  };

  const loadInstrument = async (instrumentName: string) => {
    await initializeAudio();

    if (
      currentInstrumentNameRef.current !== instrumentName ||
      !isLoadedRef.current
    ) {
      const instrument = await new Soundfont(audioCtxRef.current!, {
        instrument: instrumentName,
      }).load;
      instrumentRef.current = instrument;
      isLoadedRef.current = true;
      currentInstrumentNameRef.current = instrumentName;
    }
  };

  const playNote = (note: string) => {
    const normalizedNote = note.replace("♯", "#");
    if (instrumentRef.current) {
      instrumentRef.current.start({
        note: normalizedNote,
        velocity: 100,
        duration: 0.75,
      });
    }
  };

  return { playNote, loadInstrument };
}
