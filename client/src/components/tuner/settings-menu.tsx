import { useState } from "react";

import { defaultTunerSettings } from "@/contexts/user-settings-context";
import { validators } from "@/utils/settings-utils";
import { Button, Checkbox, NumberInput, Tooltip } from "@mantine/core";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useUserSettings } from "@/contexts/user-settings-context";
import "./settings-menu.css";
import type { TunerSettings } from "@/types/user-types";

interface settingsMenuProps {
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsMenu({
  setShowSettingsMenu,
}: settingsMenuProps) {
  const { tunerSettings, updateTunerSettings } = useUserSettings();

  const [localSettings, setLocalSettings] = useState(tunerSettings);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    buffer: null,
    minVolume: null,
    clarity: null,
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
    setLocalSettings(defaultTunerSettings);
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
      <div className="cents-toggle">
        <Checkbox
          color="var(--accent-color)"
          label="Pro Accuracy"
          checked={localSettings.isProAccuracy}
          onChange={(event) => {
            const checked = event.currentTarget.checked;
            setLocalSettings((prev) => ({
              ...prev,
              isProAccuracy: checked,
            }));
          }}
        />
        <Tooltip
          color="var(--secondary-color-invert)"
          style={{ color: "var(--text-color-invert)" }}
          withArrow
          multiline
          w={200}
          label="Tuning data is show in cents instead of frequency. 100 cents = 1 semitone."
          events={{ hover: true, focus: false, touch: true }}
        >
          <IoIosHelpCircleOutline color="var(--text-color)" size={24} />
        </Tooltip>
      </div>
      <div className="settings-input-wrapper">
        <NumberInput
          label="Min Volume (dB)"
          value={localSettings.minVolume}
          min={-1000}
          max={0}
          clampBehavior="none"
          onChange={(value) => handleChange("minVolume", value ?? 0)}
          error={errors.minVolume}
        />

        <NumberInput
          label="Clarity Threshold (%)"
          value={localSettings.clarity}
          min={1}
          max={100}
          suffix="%"
          clampBehavior="none"
          onChange={(value) => handleChange("clarity", value ?? 0)}
          error={errors.clarity}
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
          value={localSettings.buffer}
          min={32}
          max={32768}
          clampBehavior="none"
          error={errors.buffer}
          onChange={(value) => handleChange("buffer", value ?? 0)}
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
          onClick={() => {
            updateTunerSettings(localSettings);
            setShowSettingsMenu(false);
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
