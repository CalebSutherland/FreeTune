import { useParams } from "react-router-dom";
import { useNotePlayer } from "@/hooks/use-note-player";
import db from "@tombatossals/chords-db/lib/guitar.json";
import DiagramCard from "./diagram/diagram-card";
import type { Key } from "@/types/chord-types";
import { useChordLibrary } from "@/contexts/chord-library-context";

export default function ChordSuffix() {
  const params = useParams<{ key: string; suffix: string }>();

  const routeKey = params.key as Key | undefined;
  const routeSuffix = params.suffix
    ? decodeURIComponent(params.suffix)
    : undefined;

  if (!routeKey || !routeSuffix || !(routeKey in db.chords)) {
    return <p>Invalid chord key or suffix</p>;
  }

  const chordsForKey = db.chords[routeKey as Key];
  const chord = chordsForKey.find((c) => c.suffix === routeSuffix);

  if (!chord) {
    return (
      <p>
        No chord found for {routeKey} {routeSuffix}
      </p>
    );
  }

  const { playNote, loadInstrument } = useNotePlayer();
  const { size, speed } = useChordLibrary();
  return (
    <>
      {chord.positions.map((pos, i) => (
        <DiagramCard
          key={i}
          keyName={routeKey}
          suffix={routeSuffix}
          chord={pos}
          link={false}
          version={i + 1}
          diagramSize={size}
          diagramSpeed={speed}
          playNote={playNote}
          loadInstrument={loadInstrument}
        />
      ))}
    </>
  );
}
