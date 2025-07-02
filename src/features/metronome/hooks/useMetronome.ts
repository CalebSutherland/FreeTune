import { useRef, useState, useEffect } from "react";

export function useMetronome(initialBpm = 120) {
  const [bpm, setBpm] = useState(initialBpm);
  const bpmRef = useRef(bpm);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentBeat, setCurrentBeat] = useState(0);
  const currentBeatRef = useRef(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [noteValue, setNoteValue] = useState(4);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0); // seconds

  const lookahead = 25.0; // ms
  const scheduleAheadTime = 0.1; // sec

  function playClick(time: number, isAccent: boolean) {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const envelope = ctx.createGain();

    osc.frequency.value = isAccent ? 1500 : 1000;
    envelope.gain.value = isAccent ? 1 : 0.6;

    osc.connect(envelope);
    envelope.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  function scheduler() {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const beat = currentBeatRef.current;
      const isAccent = beat % beatsPerMeasure === 0;

      playClick(nextNoteTimeRef.current, isAccent);
      setCurrentBeat(beat);

      currentBeatRef.current = (beat + 1) % beatsPerMeasure;

      const beatDuration = 60.0 / bpmRef.current;
      const adjustedBeat = noteValue === 8 ? beatDuration / 2 : beatDuration;
      nextNoteTimeRef.current += adjustedBeat;
    }
  }

  async function start() {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    } else if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
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
  };
}
