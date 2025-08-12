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
