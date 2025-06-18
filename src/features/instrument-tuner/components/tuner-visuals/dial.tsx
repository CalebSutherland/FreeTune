import React, { useRef } from "react";
import { getColorFromFreqDiff } from "../../utils/noteUtils";
import "./dial.css";

interface DialProps {
  freqDifference: number | null;
  centsDifference: number | null; // For future use
}

export default function Dial({ freqDifference }: DialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const maxHz = 10; // Fixed max Hz difference for display

  // Calculate needle rotation (-90 to +90 degrees) based on frequency difference
  const calculateNeedleRotation = () => {
    if (freqDifference === null) return 0;
    // Clamp the frequency difference to the max range
    const clampedHz = Math.max(Math.min(freqDifference, maxHz), -maxHz);
    // Convert to degrees (-90 to +90)
    return (clampedHz / maxHz) * 90;
  };

  const needleRotation = calculateNeedleRotation();
  const currentColor = getColorFromFreqDiff(
    freqDifference,
    "var(--text-color)"
  );

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

        {/* Needle */}
        <div
          className="needle"
          style={{
            transform: `rotate(${needleRotation}deg)`,
            borderTopColor: currentColor,
          }}
        />

        {/* Center dot */}
        <div className="center-dot" />
      </div>

      {/* Hz display */}
      <div className="digital-readout">
        <div className="hz-display">
          {freqDifference !== null
            ? `${freqDifference > 0 ? "+" : ""}${freqDifference.toFixed(0)}`
            : ""}
        </div>
      </div>
    </div>
  );
}
