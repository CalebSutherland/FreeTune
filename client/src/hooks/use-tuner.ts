import { useEffect, useRef, useState } from "react";

import { PitchDetector } from "pitchy";
import type { TunerSettings } from "@/types/tuner-types";
import { useUserSettings } from "@/contexts/user-settings-context";

export function useTuner() {
  const { tunerSettings } = useUserSettings();
  const [pitch, setPitch] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);

  const settingsRef = useRef<TunerSettings>({
    bufferSize: tunerSettings.buffer,
    minVolumeDecibels: tunerSettings.minVolume,
    minClarityPercent: tunerSettings.clarity,
    minPitch: tunerSettings.minPitch,
    maxPitch: tunerSettings.maxPitch,
  });
  const isListeningRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pitchDetectorRef = useRef<InstanceType<typeof PitchDetector> | null>(
    null
  );

  // Update settings ref when settings change
  useEffect(() => {
    settingsRef.current = {
      bufferSize: tunerSettings.buffer,
      minVolumeDecibels: tunerSettings.minVolume,
      minClarityPercent: tunerSettings.clarity,
      minPitch: tunerSettings.minPitch,
      maxPitch: tunerSettings.maxPitch,
    };

    if (pitchDetectorRef.current) {
      pitchDetectorRef.current.minVolumeDecibels = tunerSettings.minVolume;
    }

    if (isListeningRef.current && analyserRef.current) {
      const currentBufferSize = analyserRef.current.fftSize;
      if (currentBufferSize !== tunerSettings.buffer) {
        restart();
      }
    }
  }, [tunerSettings]);

  const stop = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }

    setIsListening(false);
    isListeningRef.current = false;
    setPitch(null);
    setClarity(0);
  };

  const start = async () => {
    if (isListeningRef.current) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = settingsRef.current.bufferSize;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      source.connect(analyser);

      const detector = PitchDetector.forFloat32Array(
        settingsRef.current.bufferSize
      );
      detector.minVolumeDecibels = settingsRef.current.minVolumeDecibels;
      pitchDetectorRef.current = detector;

      isListeningRef.current = true;
      setIsListening(true);

      intervalIdRef.current = setInterval(() => {
        detectPitch();
      }, 50);
    } catch (error) {
      console.error("Error starting tuner:", error);
      stop();
      throw error;
    }
  };

  const restart = async () => {
    stop();
    await start();
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
    const currentSettings = settingsRef.current;

    if (
      clarityPercent >= currentSettings.minClarityPercent &&
      detectedPitch >= currentSettings.minPitch &&
      detectedPitch <= currentSettings.maxPitch
    ) {
      setPitch(detectedPitch);
      setClarity(detectedClarity);
    } else {
      setPitch(null);
      setClarity(detectedClarity);
    }
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { pitch, clarity, isListening, start, stop, restart };
}
