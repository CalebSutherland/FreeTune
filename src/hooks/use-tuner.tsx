import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";
import type { TunerSettings } from "@/features/instrument-tuner/types/types";

const defaultSettings: TunerSettings = {
  bufferSize: 2048,
  minVolumeDecibels: -40,
  minClarityPercent: 95,
  minPitch: 30,
  maxPitch: 10000,
};

export function useTuner(settings: TunerSettings = defaultSettings) {
  const [pitch, setPitch] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pitchDetectorRef = useRef<InstanceType<typeof PitchDetector> | null>(
    null
  );
  const streamRef = useRef<MediaStream | null>(null);
  const isListeningRef = useRef<boolean>(false);

  // Store current settings in a ref so detectPitch can access the latest values
  const settingsRef = useRef<TunerSettings>(settings);

  // Update settings ref when settings change
  useEffect(() => {
    settingsRef.current = settings;
    console.log(settings);

    // Update pitch detector settings if it exists
    if (pitchDetectorRef.current) {
      pitchDetectorRef.current.minVolumeDecibels = settings.minVolumeDecibels;
    }

    // If buffer size changed and we're listening, we need to restart
    if (isListeningRef.current && analyserRef.current) {
      const currentBufferSize = analyserRef.current.fftSize;
      if (currentBufferSize !== settings.bufferSize) {
        console.log("Buffer size changed, restarting tuner");
        restart();
      }
    }
  }, [settings]);

  const stop = () => {
    console.log("Stopping tuner");

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      console.log("Cleared interval");
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
      console.log("Disconnected source");
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      console.log("Closed audio context");
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      console.log("Stopped media stream");
    }

    setIsListening(false);
    isListeningRef.current = false;
    setPitch(null);
    setClarity(0);
    console.log("Set isListening to false");
  };

  const start = async () => {
    if (isListeningRef.current) {
      console.log("Already listening, skipping start");
      return;
    }

    console.log("Starting tuner with settings:", settingsRef.current);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      console.log("Got media stream");

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      console.log("Created audio context");

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = settingsRef.current.bufferSize;
      analyserRef.current = analyser;
      console.log(
        "Created analyser with buffer size:",
        settingsRef.current.bufferSize
      );

      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      source.connect(analyser);
      console.log("Connected source to analyser");

      const detector = PitchDetector.forFloat32Array(
        settingsRef.current.bufferSize
      );
      detector.minVolumeDecibels = settingsRef.current.minVolumeDecibels;
      pitchDetectorRef.current = detector;
      console.log("Created pitch detector");

      isListeningRef.current = true;
      setIsListening(true);
      console.log("Set isListening to true");

      intervalIdRef.current = setInterval(() => {
        detectPitch();
      }, 50);
      console.log("Started pitch detection interval");
    } catch (error) {
      console.error("Error starting tuner:", error);
      stop();
      throw error;
    }
  };

  const restart = async () => {
    console.log("Restart called");
    // Always stop first, then start
    stop();
    // Small delay to ensure cleanup is complete
    console.log("Waiting for cleanup...");
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("Starting after cleanup...");
    await start();
    console.log("Restart completed");
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

    const clarityPercent = detectedClarity * 100;

    // Use current settings from ref
    const currentSettings = settingsRef.current;

    if (
      clarityPercent >= currentSettings.minClarityPercent &&
      detectedPitch >= currentSettings.minPitch &&
      detectedPitch <= currentSettings.maxPitch
    ) {
      setPitch(detectedPitch);
      setClarity(detectedClarity);
    } else {
      // No valid pitch detected in current frame
      setPitch(null);
      setClarity(detectedClarity);
    }
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { pitch, clarity, isListening, start, stop, restart };
}
