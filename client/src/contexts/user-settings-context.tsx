import React, { createContext, useContext, useEffect, useState } from "react";

import merge from "lodash/merge";
import type { UserSettings } from "@/types/user-types";

const defaultSettings: UserSettings = {
  instrument: {
    instrumentFamilyIndex: 0,
    instrumentIndex: 0,
    tuningName: "Standard",
    tuningNotes: ["E2", "A2", "D3", "G3", "B3", "E4"],
    visualName: "graph",
  },
  tuner: {
    isProAccuracy: false,
    minVolume: -40,
    clarity: 0.95,
    minPitch: 30,
    maxPitch: 10000,
    buffer: 2048,
  },
  metronome: {
    timeSignature: "4/4",
    bpm: 120,
    sound: "default",
  },
  chordLibrary: {
    chordSize: "sm",
    chordSpeed: "fast",
  },
};

type UserSettingsContextType = {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  loading: boolean;
};

const UserSettingsContext = createContext<UserSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  loading: true,
});

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const res = await fetch("/api/user/settings");
  //       if (!res.ok) throw new Error("Failed to fetch settings");
  //       const data: UserSettings = await res.json();
  //       setSettings(data);
  //     } catch (error) {
  //       console.error("Error loading user settings:", error);
  //       // fallback to defaults
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSettings();
  // }, []);

  const updateSettings = (updates: Partial<UserSettings>) => {
    const newSettings = merge({}, settings, updates);

    setSettings(newSettings);

    // Save to backend
    // fetch("/api/user/settings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newSettings),
    // }).catch((err) => console.error("Failed to save settings:", err));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);
