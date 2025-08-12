import type {
  ChordSettings,
  InstrumentSettings,
  MetronomeSettings,
  TunerSettings,
} from "@/types/user-types";

const API_URL = import.meta.env.VITE_API_URL;

export async function patchInstrumentSettings(settings: InstrumentSettings) {
  try {
    const result = await fetch(`${API_URL}/api/user_settings/instrument`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(
        errorData.message || "Failed to update instrument settings"
      );
    }
    return await result.json();
  } catch (error) {
    console.error("Error updating instrument settings:", error);
    throw error;
  }
}

export async function patchTunerSettings(settings: TunerSettings) {
  try {
    const result = await fetch(`${API_URL}/api/user_settings/tuner`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.message || "Failed to update tuner settings");
    }
    return await result.json();
  } catch (error) {
    console.error("Error updating tuner settings:", error);
    throw error;
  }
}

export async function patchMetronomeSettings(settings: MetronomeSettings) {
  try {
    const result = await fetch(`${API_URL}/api/user_settings/metronome`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(
        errorData.message || "Failed to update metronome settings"
      );
    }
    return await result.json();
  } catch (error) {
    console.error("Error updating metronome settings:", error);
    throw error;
  }
}

export async function patchChordSettings(settings: ChordSettings) {
  try {
    const result = await fetch(`${API_URL}/api/user_settings/chord`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.message || "Failed to update chord settings");
    }
    return await result.json();
  } catch (error) {
    console.error("Error updating chord settings:", error);
    throw error;
  }
}

export async function getInstrumentSettings() {
  const result = await fetch(`${API_URL}/api/user_settings/instrument`, {
    credentials: "include",
  });

  if (!result.ok) {
    throw new Error("Failed to load instrument settings");
  }
  const settings: InstrumentSettings = await result.json();
  return settings;
}

export async function getTunerSettings() {
  const result = await fetch(`${API_URL}/api/user_settings/tuner`, {
    credentials: "include",
  });

  if (!result.ok) {
    throw new Error("Failed to load tuner settings");
  }
  const settings: TunerSettings = await result.json();
  return settings;
}

export async function getMetronomeSettings() {
  const result = await fetch(`${API_URL}/api/user_settings/metronome`, {
    credentials: "include",
  });

  if (!result.ok) {
    throw new Error("Failed to load metronome settings");
  }
  const settings: MetronomeSettings = await result.json();
  return settings;
}

export async function getChordSettings() {
  const result = await fetch(`${API_URL}/api/user_settings/chord`, {
    credentials: "include",
  });

  if (!result.ok) {
    throw new Error("Failed to load chord settings");
  }
  const settings: ChordSettings = await result.json();
  return settings;
}
