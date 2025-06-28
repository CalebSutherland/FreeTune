import { useParams } from "react-router-dom";
import { useChordLibrary } from "@/contexts/chord-library-context";
import db from "@tombatossals/chords-db/lib/guitar.json";
import DiagramCard from "./diagram/diagram-card";
import type { Key } from "@/types/chord-types";

export default function ChordSuffix() {
  const { size, speed, playNote, loadInstrument } = useChordLibrary();

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
  return (
    <>
      {chord.positions.map((pos, i) => (
        <DiagramCard
          key={i}
          keyName={routeKey}
          suffix={routeSuffix}
          chord={pos}
          playNote={playNote}
          loadInstrument={loadInstrument}
          size={size}
          speed={speed}
          link={false}
        />
      ))}
    </>
  );
}
