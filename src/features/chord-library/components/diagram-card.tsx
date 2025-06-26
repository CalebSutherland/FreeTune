import type { Chord } from "../types/types";
import ChordDiagram from "./chord-diagram";
import { ActionIcon } from "@mantine/core";
import { FaVolumeHigh } from "react-icons/fa6";
import "./diagram-card.css";
import { midiToNoteName } from "../utils/chord-utils";

interface DiagramCardrops {
  keyName: string;
  suffix: string;
  chord: Chord;
  midi: number[];
  playNote: (note: string) => void;
  loadInstrument: (instrument: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function diagramCard({
  keyName,
  suffix,
  chord,
  midi,
  playNote,
  loadInstrument,
  size,
}: DiagramCardrops) {
  const scaleMap = {
    xs: 0.6,
    sm: 0.8,
    md: 1,
    lg: 1.2,
    xl: 1.4,
  };

  const scale = scaleMap[size ?? "xs"];

  async function playChordSequence() {
    loadInstrument("acoustic_guitar_nylon");
    for (const note of midi) {
      const noteName = midiToNoteName(note);
      playNote(noteName);
      await new Promise((resolve) => setTimeout(resolve, 50));
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
        {keyName} {suffix}
      </p>
      <ActionIcon
        color={"var(--accent-color)"}
        className="diagram-audio-icon"
        onClick={playChordSequence}
      >
        <FaVolumeHigh size={scaleMap[size ?? "xs"] * 30} />
      </ActionIcon>
    </div>
  );
}
