import { useParams } from "react-router-dom";
import { useChordLibrary } from "@/contexts/chord-library-context";
import db from "@tombatossals/chords-db/lib/guitar.json";
import DiagramCard from "./diagram/diagram-card";
import type { Key } from "@/types/chord-types";

export default function ChordKey() {
  const { size, speed, playNote, loadInstrument } = useChordLibrary();
  const { key: routeKey } = useParams<{ key: string }>();

  if (!routeKey || !(routeKey in db.chords)) {
    return <p>Invalid key</p>;
  }

  const chordList = db.chords[routeKey as Key];
  const suffixes = Array.from(new Set(chordList.map((chord) => chord.suffix)));

  return (
    <>
      {suffixes.map((suf) => {
        const chord = chordList.find((c) => c.suffix === suf);
        return (
          chord && (
            <div key={`${routeKey}-${suf}`}>
              <DiagramCard
                keyName={routeKey}
                suffix={suf}
                chord={chord.positions[0]}
                playNote={playNote}
                loadInstrument={loadInstrument}
                size={size}
                speed={speed}
                link={true}
              />
            </div>
          )
        );
      })}
    </>
  );
}
