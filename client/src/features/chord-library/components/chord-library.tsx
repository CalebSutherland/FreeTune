import db from "@tombatossals/chords-db/lib/guitar.json";
import { useNotePlayer } from "@/hooks/use-note-player";
import { useChordLibrary } from "@/contexts/chord-library-context";
import type { Key } from "@/types/chord-types";
import DiagramCard from "./diagram/diagram-card";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Transition } from "@mantine/core";
import { FaArrowUp } from "react-icons/fa";

export default function ChordLibrary() {
  const keys = Object.keys(db.chords) as Key[];
  const [scroll, scrollTo] = useWindowScroll();
  const { playNote, loadInstrument } = useNotePlayer();
  const { size, speed } = useChordLibrary();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition={"slide-up"} mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              color="var(--accent-color)"
              leftSection={<FaArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
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
                  link={true}
                  diagramSize={size}
                  diagramSpeed={speed}
                  playNote={playNote}
                  loadInstrument={loadInstrument}
                />
              </div>
            )
          );
        });
      })}
    </>
  );
}
