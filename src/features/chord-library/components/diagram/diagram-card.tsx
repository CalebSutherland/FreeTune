import { NavLink } from "react-router-dom";
import { paths } from "@/config/paths";
import { useChordLibrary } from "@/contexts/chord-library-context";
import type { Chord } from "@/types/chord-types";
import { midiToNoteName } from "../../utils/chord-utils";
import { scaleMap } from "../../utils/scale-map";
import { formatKeyName } from "@/utils/chord-utils";
import ChordDiagram from "./chord-diagram";
import { ActionIcon } from "@mantine/core";
import { FaVolumeHigh } from "react-icons/fa6";
import "./diagram-card.css";

interface DiagramCardrops {
  keyName: string;
  suffix: string;
  chord: Chord;
  link: boolean;
  version?: number;
}

export default function diagramCard({
  keyName,
  suffix,
  chord,
  link,
  version,
}: DiagramCardrops) {
  const { size, speed, playNote, loadInstrument } = useChordLibrary();
  const scale = scaleMap[size ?? "xs"];

  async function playChordSequence() {
    await loadInstrument("acoustic_guitar_nylon");
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
        className="diagram-audio-icon"
        size={50 * scaleMap[size ?? "xs"]}
        onClick={playChordSequence}
      >
        <FaVolumeHigh />
      </ActionIcon>
    </div>
  );
}
