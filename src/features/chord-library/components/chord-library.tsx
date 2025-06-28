import { useChordLibrary } from "@/contexts/chord-library-context";
import db from "@tombatossals/chords-db/lib/guitar.json";
import type { Key } from "@/types/chord-types";
import DiagramCard from "./diagram/diagram-card";

export default function ChordLibrary() {
  const { size, speed, playNote, loadInstrument } = useChordLibrary();
  const keys = Object.keys(db.chords) as Key[];

  return (
    <>
      {keys.flatMap((k) => {
        const chordListForKey = db.chords[k];
        const suffixesForKey = Array.from(
          new Set(chordListForKey.map((chord) => chord.suffix))
        );

        return suffixesForKey.map((suf) => {
          const chord = chordListForKey.find((c) => c.suffix === suf);
          return (
            chord && (
              <div key={`${k}-${suf}`}>
                <DiagramCard
                  keyName={k}
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
        });
      })}
    </>
  );
}
