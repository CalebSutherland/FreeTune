import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";

export function useTuner() {
  const [pitch, setPitch] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const bufferSize = 2048;
  const pitchDetectorRef = useRef<InstanceType<typeof PitchDetector> | null>(
    null
  );

  const start = async () => {
    if (isListening) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = bufferSize;
    analyserRef.current = analyser;

    const source = audioContext.createMediaStreamSource(stream);
    sourceRef.current = source;

    source.connect(analyser);

    const detector = PitchDetector.forFloat32Array(bufferSize);
    pitchDetectorRef.current = detector;

    setIsListening(true);
    detectPitch();
  };

  const stop = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }

    setIsListening(false);
    setPitch(null);
    setClarity(0);
  };

  const detectPitch = () => {
    if (
      !analyserRef.current ||
      !audioContextRef.current ||
      !pitchDetectorRef.current
    )
      return;

    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);

    const [detectedPitch, detectedClarity] = pitchDetectorRef.current.findPitch(
      buffer,
      audioContextRef.current.sampleRate
    );

    if (detectedClarity > 0.9) {
      // Adjust this threshold as needed
      setPitch(detectedPitch);
      setClarity(detectedClarity);
    }

    rafIdRef.current = requestAnimationFrame(detectPitch);
  };

  useEffect(() => {
    return () => stop(); // Clean up on unmount
  }, []);

  return { pitch, clarity, isListening, start, stop };
}
