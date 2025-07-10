import { useRef, useState, useEffect } from "react";

export function useMetronome(initialBpm = 120, selectedSound = "click") {
  const [bpm, setBpm] = useState(initialBpm);
  const bpmRef = useRef(bpm);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentBeat, setCurrentBeat] = useState(0);
  const currentBeatRef = useRef(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [noteValue, setNoteValue] = useState(4);
  const [beatCount, setBeatCount] = useState(0);

  const soundBuffersRef = useRef<Record<string, AudioBuffer>>({});
  const soundsLoadedRef = useRef(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0); // seconds

  const lookahead = 25.0; // ms
  const scheduleAheadTime = 0.1; // sec

  function playClick(time: number, isAccent: boolean) {
    const ctx = audioContextRef.current;
    const buffer = soundBuffersRef.current[selectedSound];

    if (!ctx || !buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = isAccent ? 1.5 : 1.0;
    source.connect(ctx.destination);
    source.start(time);
  }

  function scheduler() {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const beat = currentBeatRef.current;
      const isAccent = beat % beatsPerMeasure === 0;

      playClick(nextNoteTimeRef.current, isAccent);
      setCurrentBeat(beat);
      setBeatCount((prev) => prev + 1);

      currentBeatRef.current = (beat + 1) % beatsPerMeasure;

      const beatDuration = 60.0 / bpmRef.current;
      const adjustedBeat = noteValue === 8 ? beatDuration / 2 : beatDuration;
      nextNoteTimeRef.current += adjustedBeat;
    }
  }

  async function start() {
    if (
      !audioContextRef.current ||
      audioContextRef.current.state === "closed"
    ) {
      audioContextRef.current = new window.AudioContext();
    } else if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    if (!soundsLoadedRef.current) {
      const ctx = audioContextRef.current;
      const soundFiles = ["click", "drumstick", "hi-hat", "cowbell"];

      for (const name of soundFiles) {
        const response = await fetch(`/sounds/${name}.mp3`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        soundBuffersRef.current[name] = audioBuffer;
      }

      soundsLoadedRef.current = true;
    }

    currentBeatRef.current = 0;
    setCurrentBeat(0);
    nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.05;
    setIsPlaying(true);
    intervalRef.current = window.setInterval(scheduler, lookahead);
  }

  function stop() {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentBeat(0);
  }

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    return () => {
      stop();
      audioContextRef.current?.close();
    };
  }, []);

  return {
    bpm,
    setBpm,
    isPlaying,
    start,
    stop,
    currentBeat,
    beatsPerMeasure,
    setBeatsPerMeasure,
    setCurrentBeat,
    noteValue,
    setNoteValue,
    beatCount,
  };
}
