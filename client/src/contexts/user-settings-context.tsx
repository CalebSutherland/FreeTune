import React, { createContext, useContext, useEffect, useState } from "react";

import type {
  ChordSettings,
  InstrumentSettings,
  MetronomeSettings,
  TunerSettings,
  UserSettingsContextType,
} from "@/types/user-types";

const defaultInstrumentSettings: InstrumentSettings = {
  instrumentFamilyIndex: 0,
  instrumentIndex: 0,
  tuningName: "Standard",
  tuningNotes: ["E2", "A2", "D3", "G3", "B3", "E4"],
  visualName: "graph",
};

export const defaultTunerSettings: TunerSettings = {
  isProAccuracy: false,
  minVolume: -40,
  clarity: 0.95,
  minPitch: 30,
  maxPitch: 10000,
  buffer: 2048,
};

const defaultMetronomeSettings: MetronomeSettings = {
  beatsPerMeasure: 4,
  beatType: 4,
  bpm: 120,
  sound: "click",
};

const defaultChordSettings: ChordSettings = {
  size: "sm",
  speed: "fast",
};

export const UserSettingsContext = createContext<
  UserSettingsContextType | undefined
>(undefined);

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [instrumentSettings, setInstrumentSettings] =
    useState<InstrumentSettings>(defaultInstrumentSettings);
  const [tunerSettings, setTunerSettings] =
    useState<TunerSettings>(defaultTunerSettings);
  const [metronomeSettings, setMetronomeSettings] = useState<MetronomeSettings>(
    defaultMetronomeSettings
  );
  const [chordSettings, setChordSettings] =
    useState<ChordSettings>(defaultChordSettings);

  const updateInstrumentSettings = (updates: Partial<InstrumentSettings>) =>
    setInstrumentSettings((prev) => ({ ...prev, ...updates }));

  const updateTunerSettings = (updates: Partial<TunerSettings>) =>
    setTunerSettings((prev) => ({ ...prev, ...updates }));

  const updateMetronomeSettings = (updates: Partial<MetronomeSettings>) =>
    setMetronomeSettings((prev) => ({ ...prev, ...updates }));

  const updateChordSettings = (updates: Partial<ChordSettings>) =>
    setChordSettings((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    console.log(instrumentSettings);
  }, [instrumentSettings]);

  useEffect(() => {
    console.log(tunerSettings);
  }, [tunerSettings]);

  useEffect(() => {
    console.log(metronomeSettings);
  }, [metronomeSettings]);

  useEffect(() => {
    console.log(chordSettings);
  }, [chordSettings]);

  return (
    <UserSettingsContext.Provider
      value={{
        instrumentSettings,
        tunerSettings,
        metronomeSettings,
        chordSettings,
        updateInstrumentSettings,
        updateTunerSettings,
        updateMetronomeSettings,
        updateChordSettings,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export function useUserSettings() {
  const context = useContext(UserSettingsContext);
  if (!context)
    throw new Error("useUserSettings must be used within UserSettingsProvider");
  return context;
}
