import type { Chord } from "../types/types";
import { formatKeyName, midiToNoteName } from "../utils/chord-utils";
import ChordDiagram from "./chord-diagram";
import { ActionIcon } from "@mantine/core";
import { FaVolumeHigh } from "react-icons/fa6";
import "./diagram-card.css";

interface DiagramCardrops {
  keyName: string;
  suffix: string;
  chord: Chord;
  midi: number[];
  playNote: (note: string) => void;
  loadInstrument: (instrument: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  speed: "slow" | "fast";
}

export default function diagramCard({
  keyName,
  suffix,
  chord,
  midi,
  playNote,
  loadInstrument,
  size,
  speed,
}: DiagramCardrops) {
  const scaleMap = {
    xs: 0.4,
    sm: 0.6,
    md: 0.8,
    lg: 1,
    xl: 1.2,
  };

  const scale = scaleMap[size ?? "xs"];

  async function playChordSequence() {
    loadInstrument("acoustic_guitar_nylon");
    if (speed === "slow") {
      for (const note of midi) {
        const noteName = midiToNoteName(note);
        playNote(noteName);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    } else {
      for (const note of midi) {
        const noteName = midiToNoteName(note);
        playNote(noteName);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    }
  }
  return (
    <div className="diagram-card-wrapper" style={{ ["--scale" as any]: scale }}>
      <div className="diagram">
        <ChordDiagram
          chord={chord}
          playNote={playNote}
          loadInstrument={loadInstrument}
          size={size}
        />
      </div>
      <p className="diagram-label">
        {formatKeyName(keyName)} {suffix}
      </p>
      <ActionIcon
        color={"var(--accent-color)"}
        className="diagram-audio-icon"
        size={50 * scaleMap[size ?? "xs"]}
        onClick={playChordSequence}
      >
        <FaVolumeHigh />
      </ActionIcon>
    </div>
  );
}
