import React, { useRef } from "react";
import {
  getColorFromFreqDiff,
  calculateNeedleRotation,
} from "@/utils/visual-utils";
import "./dial.css";
import { useUserSettings } from "@/contexts/user-settings-context";

interface DialProps {
  freqDifference: number | null;
  centsDifference: number | null;
}

export default function Dial({ freqDifference, centsDifference }: DialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const maxHz = 10;

  const needleRotation = calculateNeedleRotation(freqDifference, maxHz);
  const currentColor = getColorFromFreqDiff(freqDifference, "var(--note-btn)");

  const { tunerSettings } = useUserSettings();

  // Generate tick marks on the arc
  const generateTicks = (): React.JSX.Element[] => {
    const ticks: React.JSX.Element[] = [];
    const tickAngles = [-67.5, -45, -22.5, 0, 22.5, 45, 67.5];

    tickAngles.forEach((angle) => {
      ticks.push(
        <div
          key={`tick-${angle}`}
          className={`arc-tick ${angle === 0 ? "center-arc-tick" : ""}`}
          style={{
            transform: `rotate(${angle}deg)`,
          }}
        />
      );
    });

    return ticks;
  };

  return (
    <div className="dial-container" ref={dialRef}>
      <div className="dial-background">
        {/* Arc with tick marks */}
        <div className="dial-arc">{generateTicks()}</div>

        {/* Sharp and Flat icons */}
        <div className="sharp-icon">♯</div>
        <div className="flat-icon">♭</div>

        {/* Needle */}
        <svg
          className="needle"
          style={{ transform: `rotate(${needleRotation}deg)` }}
          width="20"
          height="125"
          viewBox="0 0 20 125"
        >
          <polygon points="10,0 15,125 5,125" fill={currentColor} />
        </svg>

        {/* Center dot */}
        <div
          className="center-dot"
          style={{
            background: currentColor,
          }}
        />
      </div>

      {/* Hz display */}
      <div className="digital-readout">
        <div className="hz-display">
          {tunerSettings.isProAccuracy
            ? centsDifference !== null
              ? `${centsDifference.toFixed(0)}`
              : " "
            : freqDifference !== null
            ? `${freqDifference.toFixed(0)}`
            : ""}
        </div>
      </div>
    </div>
  );
}
