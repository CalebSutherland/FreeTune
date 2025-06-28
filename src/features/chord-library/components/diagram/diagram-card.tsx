import type { Chord, Key } from "@/types/chord-types";
import { midiToNoteName } from "../../utils/chord-utils";
import ChordDiagram from "./chord-diagram";
import { ActionIcon } from "@mantine/core";
import { FaVolumeHigh } from "react-icons/fa6";
import "./diagram-card.css";
import { scaleMap } from "../../utils/scale-map";
import { formatKeyName } from "@/utils/chord-utils";

interface DiagramCardrops {
  keyName: string;
  suffix: string;
  chord: Chord;
  playNote: (note: string) => void;
  loadInstrument: (instrument: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  speed: "slow" | "fast";
  link: boolean;
  version?: number;
}

export default function diagramCard({
  keyName,
  suffix,
  chord,
  playNote,
  loadInstrument,
  size,
  speed,
  link,
  version,
}: DiagramCardrops) {
  const scale = scaleMap[size ?? "xs"];

  async function playChordSequence() {
    loadInstrument("acoustic_guitar_nylon");
    if (speed === "slow") {
      for (const note of chord.midi) {
        const noteName = midiToNoteName(note);
        playNote(noteName);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    } else {
      for (const note of chord.midi) {
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
      {link ? (
        <button className="diagram-link">
          {formatKeyName(keyName)} {suffix}
        </button>
      ) : (
        <p className="diagram-label">
          {formatKeyName(keyName)} {suffix} {`(v${version})`}
        </p>
      )}

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
