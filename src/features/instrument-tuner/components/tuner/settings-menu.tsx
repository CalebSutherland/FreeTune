import { useState } from "react";
import { Button, NumberInput } from "@mantine/core";
import type { TunerSettings } from "../../types/types";
import { validators } from "../../utils/utils";

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
    const error = validator ? validator(numericValue) : null;

    setErrors((prev) => ({ ...prev, [field]: error }));
    setLocalSettings((prev) => ({ ...prev, [field]: numericValue }));
  };

  return (
    <div>
      <NumberInput
        label="Buffer Size"
        value={localSettings.bufferSize}
        min={32}
        max={32768}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        error={errors.bufferSize}
        onChange={(value) => handleChange("bufferSize", value ?? 0)}
      />

      <NumberInput
        label="Min Volume (dB)"
        value={localSettings.minVolumeDecibels}
        min={-1000}
        max={0}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        onChange={(value) => handleChange("minVolumeDecibels", value ?? 0)}
        error={errors.minVolumeDecibels}
      />

      <NumberInput
        label="Clarity Threshold (%)"
        value={localSettings.minClarityPercent}
        min={1}
        max={100}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        onChange={(value) => handleChange("minClarityPercent", value ?? 0)}
        error={errors.minClarityPercent}
      />
      <NumberInput
        label="Min Pitch (Hz)"
        value={localSettings.minPitch}
        min={1}
        max={10000}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        onChange={(value) => handleChange("minPitch", value ?? 0)}
        error={errors.minPitch}
      />
      <NumberInput
        label="Max Pitch (Hz)"
        value={localSettings.maxPitch}
        min={0}
        max={99999}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        onChange={(value) => handleChange("maxPitch", value ?? 0)}
        error={errors.maxPitch}
      />

      <Button
        color="var(--accent-color)"
        disabled={hasErrors}
        type="button"
        mt="md"
        onClick={() => onSave(localSettings)}
      >
        Apply
      </Button>
    </div>
  );
}
