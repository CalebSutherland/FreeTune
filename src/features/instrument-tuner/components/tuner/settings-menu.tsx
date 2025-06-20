import { useState } from "react";
import { Button, NumberInput } from "@mantine/core";
import type { TunerSettings } from "../../types/types";

type SettingsMenuProps = {
  settings: TunerSettings;
  onSave: (newSettings: TunerSettings) => void;
};

export default function SettingsMenu({ settings, onSave }: SettingsMenuProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (
    field: keyof TunerSettings,
    value: string | number | null
  ) => {
    const numericValue = typeof value === "number" ? value : 0;
    setLocalSettings((prev) => ({ ...prev, [field]: numericValue }));
  };

  return (
    <div>
      <NumberInput
        label="Buffer Size"
        value={localSettings.bufferSize}
        onChange={(value) => handleChange("bufferSize", value ?? 0)}
      />
      <NumberInput
        label="Min Volume (dB)"
        value={localSettings.minVolumeDecibels}
        onChange={(value) => handleChange("minVolumeDecibels", value ?? 0)}
      />
      <NumberInput
        label="Clarity Threshold (%)"
        value={localSettings.minClarityPercent}
        onChange={(value) => handleChange("minClarityPercent", value ?? 0)}
      />
      <NumberInput
        label="Min Pitch (Hz)"
        value={localSettings.minPitch}
        onChange={(value) => handleChange("minPitch", value ?? 0)}
      />
      <NumberInput
        label="Max Pitch (Hz)"
        value={localSettings.maxPitch}
        onChange={(value) => handleChange("maxPitch", value ?? 0)}
      />

      <Button type="button" mt="md" onClick={() => onSave(localSettings)}>
        Apply
      </Button>
    </div>
  );
}
