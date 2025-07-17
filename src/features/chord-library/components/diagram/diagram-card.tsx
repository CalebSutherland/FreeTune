import { NavLink } from "react-router-dom";
import { paths } from "@/config/paths";
import type { Chord } from "@/types/chord-types";
import { formatKeyName } from "@/utils/chord-utils";
import { midiToNoteName } from "../../utils/chord-utils";
import { scaleMap } from "../../utils/scale-map";
import ChordDiagram from "./chord-diagram";
import { ActionIcon } from "@mantine/core";
import { FaVolumeHigh } from "react-icons/fa6";
import "./diagram-card.css";

interface DiagramCardrops {
  keyName: string;
  suffix: string;
  chord: Chord;
  link: boolean;
  playNote: (note: string) => void;
  loadInstrument: (instrument: string) => Promise<void>;
  version?: number;
  diagramSize?: "xs" | "sm" | "md" | "lg" | "xl";
  diagramSpeed?: "slow" | "fast";
  example?: boolean;
}

export default function DiagramCard({
  keyName,
  suffix,
  chord,
  link,
  playNote,
  loadInstrument,
  version,
  diagramSize,
  diagramSpeed,
  example,
}: DiagramCardrops) {
  const scale = scaleMap[diagramSize ?? "xs"];
  const currentSpeed = diagramSpeed ?? "slow";

  async function playChordSequence() {
    await loadInstrument("acoustic_guitar_nylon");
    if (currentSpeed === "slow") {
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
          size={diagramSize ?? "xs"}
          example={example}
        />
      </div>
      {link ? (
        <NavLink
          className="diagram-link"
          to={paths.app.tools.chord_library.chord_library_key_suffix.getHref(
            keyName,
            encodeURIComponent(suffix)
          )}
        >
          {formatKeyName(keyName)} {suffix}
        </NavLink>
      ) : (
        <p className="diagram-label">
          {formatKeyName(keyName)} {suffix} {`(v${version})`}
        </p>
      )}

      <ActionIcon
        color={"var(--accent-color)"}
        className={`diagram-audio-icon ${example ? "example" : ""}`}
        size={50 * scaleMap[diagramSize ?? "xs"]}
        onClick={playChordSequence}
      >
        <FaVolumeHigh />
      </ActionIcon>
    </div>
  );
}
