import { useState } from "react";

import type { TunerSettings } from "@/types/tuner-types";
import { defaultSettings } from "@/utils/tuner-defaults";
import { validators } from "@/utils/settings-utils";
import { Button, NumberInput } from "@mantine/core";
import "./settings-menu.css";

type SettingsMenuProps = {
  settings: TunerSettings;
  onSave: (newSettings: TunerSettings) => void;
};

export default function SettingsMenu({ settings, onSave }: SettingsMenuProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    bufferSize: null,
    minVolumeDecibels: null,
    minClarityPercent: null,
    minPitch: null,
    maxPitch: null,
  });

  const hasErrors = Object.values(errors).some((error) => error !== null);

  const handleChange = (
    field: keyof TunerSettings,
    value: string | number | null
  ) => {
    const numericValue = typeof value === "number" ? value : 0;

    const validator = validators[field];
    const fieldError = validator ? validator(numericValue) : null;

    const newSettings = { ...localSettings, [field]: numericValue };

    const minPitchError = validators["minPitch"](newSettings.minPitch);
    const maxPitchError = validators["maxPitch"](newSettings.maxPitch);

    let minPitchCrossError = null;
    let maxPitchCrossError = null;

    if (newSettings.minPitch > newSettings.maxPitch) {
      minPitchCrossError = "Min pitch must be less than or equal to max pitch.";
      maxPitchCrossError =
        "Max pitch must be greater than or equal to min pitch.";
    }

    setErrors((prev) => ({
      ...prev,
      [field]: fieldError,
      minPitch: minPitchError || minPitchCrossError,
      maxPitch: maxPitchError || maxPitchCrossError,
    }));

    setLocalSettings(newSettings);
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
    setErrors({
      bufferSize: null,
      minVolumeDecibels: null,
      minClarityPercent: null,
      minPitch: null,
      maxPitch: null,
    });
  };

  return (
    <div className="settings-menu-wrapper">
      <div className="settings-input-wrapper">
        <NumberInput
          label="Min Volume (dB)"
          value={localSettings.minVolumeDecibels}
          min={-1000}
          max={0}
          clampBehavior="none"
          onChange={(value) => handleChange("minVolumeDecibels", value ?? 0)}
          error={errors.minVolumeDecibels}
        />

        <NumberInput
          label="Clarity Threshold (%)"
          value={localSettings.minClarityPercent}
          min={1}
          max={100}
          suffix="%"
          clampBehavior="none"
          onChange={(value) => handleChange("minClarityPercent", value ?? 0)}
          error={errors.minClarityPercent}
        />
        <NumberInput
          label="Min Pitch (Hz)"
          value={localSettings.minPitch}
          min={1}
          max={10000}
          clampBehavior="none"
          onChange={(value) => handleChange("minPitch", value ?? 0)}
          error={errors.minPitch}
        />
        <NumberInput
          label="Max Pitch (Hz)"
          value={localSettings.maxPitch}
          min={0}
          max={99999}
          clampBehavior="none"
          onChange={(value) => handleChange("maxPitch", value ?? 0)}
          error={errors.maxPitch}
        />

        <NumberInput
          label="Buffer Size"
          value={localSettings.bufferSize}
          min={32}
          max={32768}
          clampBehavior="none"
          error={errors.bufferSize}
          onChange={(value) => handleChange("bufferSize", value ?? 0)}
        />
      </div>
      <div className="settings-buttons-wrapper">
        <Button
          variant="outline"
          color="var(--accent-color)"
          onClick={handleReset}
        >
          Reset to default
        </Button>
        <Button
          color="var(--accent-color)"
          disabled={hasErrors}
          onClick={() => onSave(localSettings)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
